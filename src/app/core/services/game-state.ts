import { Injectable, signal } from '@angular/core';
import { version } from '@root/package.json';

import { PRODUCTION_TIER_BY_CODE } from '@data/production-tiers.data';
import { UPGRADE_TIER_BY_CODE } from '@data/upgrade-tiers.data';
import { GameState, ProductionTier, Statistics, UpgradeTier } from '@model';

const STORAGE_KEY = 'gameState';

export interface ExportedData {
  version: string;
  encoding: string;
  data: string;
}

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  public readonly appVersion = signal('');
  public readonly ownedPugs = signal(0);
  public readonly productionTiers = signal<Record<string, ProductionTier>>({});
  public readonly upgradeTiers = signal<Record<string, UpgradeTier>>({});
  public readonly prestiges = signal<Record<string, number>>({});
  public readonly achievements = signal<Record<string, boolean>>({});
  public readonly offlineGainPercent = signal(60);
  public readonly statistics = signal<Statistics>({
    totalPugs: 0,
    totalClicks: 0,
    firstClickDate: Date.now(),
    totalPrestiges: 0,
    totalSpent: 0,
  });
  public readonly lastProductionDate = signal(0);

  constructor() {
    const storedState = localStorage.getItem(STORAGE_KEY);
    if (storedState) {
      const validState = this.sanitize(storedState);
      this.restoreGameState(validState);
    } else {
      this.initGameState();
    }
    this.appVersion.set(version);
  }

  public buy(price: number): void {
    this.ownedPugs.update((owned) => owned - price);
    this.statistics.update((stats) => ({
      ...stats,
      totalSpent: stats.totalSpent + price,
    }));
  }

  public decryptState(encryptedText: string): GameState {
    const bytes = Uint8Array.from(atob(encryptedText), (c) => c.charCodeAt(0));
    const rawJson = new TextDecoder().decode(bytes);
    return JSON.parse(rawJson);
  }

  public exportData(): ExportedData {
    return {
      version: this.appVersion(),
      encoding: 'base64',
      data: localStorage.getItem(STORAGE_KEY) ?? '',
    };
  }

  public getGameState(): GameState {
    return {
      ownedPugs: this.ownedPugs(),
      lastProductionDate: Date.now(),
      productionTiers: this.productionTiers(),
      upgradeTiers: this.upgradeTiers(),
      prestiges: this.prestiges(),
      achievements: this.achievements(),
      statistics: this.statistics(),
      offlineGainPercent: this.offlineGainPercent(),
    };
  }

  public resetGame(): void {
    this.initGameState();
    this.saveState();
  }

  public restoreData(exportedData: ExportedData): void {
    this.restoreGameState(this.sanitize(exportedData.data));
    localStorage.setItem(STORAGE_KEY, exportedData.data);
  }

  public saveState(): void {
    const encryptedState = this.encryptState(this.getGameState());
    localStorage.setItem(STORAGE_KEY, encryptedState);
  }

  private encryptState(state: GameState): string {
    const bytes = new TextEncoder().encode(JSON.stringify(state));
    return btoa(String.fromCharCode(...bytes));
  }

  /**
   * Make sure that the stored state is always valid on newer versions of the app.
   */
  private sanitize(storedState: string): GameState {
    let gameState: GameState;
    try {
      gameState = this.decryptState(storedState);
    } catch (e) {
      gameState = JSON.parse(storedState);
      // NB: gameState should be modified if needed to have the correct properties
    }
    return gameState;
  }

  private initGameState(): void {
    this.ownedPugs.set(0);
    this.productionTiers.set(structuredClone(PRODUCTION_TIER_BY_CODE));
    this.upgradeTiers.set(structuredClone(UPGRADE_TIER_BY_CODE));
    this.prestiges.set({});
    this.achievements.set({});
    this.offlineGainPercent.set(60);
    this.statistics.set({
      totalPugs: 0,
      totalClicks: 0,
      firstClickDate: Date.now(),
      totalPrestiges: 0,
      totalSpent: 0,
    });
    this.lastProductionDate.set(Date.now());
  }

  private restoreGameState(gameState: GameState): void {
    this.ownedPugs.set(gameState.ownedPugs);
    this.productionTiers.set(gameState.productionTiers);
    this.upgradeTiers.set(gameState.upgradeTiers);
    this.prestiges.set(gameState.prestiges);
    this.achievements.set(gameState.achievements);
    this.offlineGainPercent.set(gameState.offlineGainPercent);
    if (!gameState.statistics.firstClickDate) {
      gameState.statistics.firstClickDate = Date.now();
    }
    this.statistics.set(gameState.statistics);
    this.lastProductionDate.set(gameState.lastProductionDate);
  }
}
