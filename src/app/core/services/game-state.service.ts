import { computed, Injectable, signal } from '@angular/core';

import { PRODUCTION_TIER_BY_CODE } from '@data/production-tiers.data';
import { GameState, ProductionTier, Statistics, UpgradeTier } from '@model';
import { UPGRADE_TIER_BY_CODE } from '@data/upgrade-tiers.data';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  public readonly ownedPugs = signal(0);
  public readonly productionTiers = signal<Record<string, ProductionTier>>({});
  public readonly upgradeTiers = signal<Record<string, UpgradeTier>>({});
  public readonly prestiges = signal<Record<string, number | undefined>>({});
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
    const storedState = localStorage.getItem('gameState');
    if (storedState) {
      this.restoreGameState(JSON.parse(storedState));
    } else {
      this.initGameState();
    }
  }

  public buy(price: number): void {
    this.ownedPugs.update((owned) => owned - price);
    this.statistics.update((stats) => ({
      ...stats,
      totalSpent: stats.totalSpent + price,
    }));
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

  public saveState(): void {
    localStorage.setItem('gameState', JSON.stringify(this.getGameState()));
  }

  private initGameState(): void {
    this.productionTiers.set(PRODUCTION_TIER_BY_CODE);
    this.upgradeTiers.set(UPGRADE_TIER_BY_CODE);
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
