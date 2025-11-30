import { computed, Injectable, signal } from '@angular/core';

import { PRODUCTION_TIER_BY_CODE } from '@data/production-tiers.data';
import { GameState, Statistics } from '@model';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  public readonly ownedPugs = signal(0);
  public readonly productionTiers = signal<Record<string, number>>({});
  public readonly upgradeTiers = signal<Record<string, number>>({});
  public readonly prestiges = signal<Record<string, number>>({});
  public readonly achievements = signal<Record<string, boolean>>({});
  public readonly offlineGainPercent = signal(100);
  public readonly statistics = signal<Statistics>({
    totalPugs: 0,
    totalClicks: 0,
    firstClickDate: Date.now(),
    totalPrestiges: 0,
    totalSpent: 0,
  });

  public readonly pugsPerSecond = computed(() => {
    let production = 0;
    const productionTiers = this.productionTiers();
    for (const tier in productionTiers) {
      production += productionTiers[tier] * PRODUCTION_TIER_BY_CODE[tier].production;
    }
    return production;
  });

  constructor() {
    const storedState = localStorage.getItem('gameState');
    if (storedState) {
      const gameState = JSON.parse(storedState);
      this.productionTiers.set(gameState.productionTiers);
      this.upgradeTiers.set(gameState.upgradeTiers);
      this.prestiges.set(gameState.prestiges);
      this.achievements.set(gameState.achievements);
      this.offlineGainPercent.set(gameState.offlineGainPercent);
      if (!gameState.statistics.firstClickDate) {
        gameState.statistics.firstClickDate = Date.now();
      }
      this.statistics.set(gameState.statistics);

      const elapsedTimeMs = Date.now() - gameState.lastProductionDate;
      const producedOffline = (elapsedTimeMs / 1000) * this.pugsPerSecond();
      // TODO: display as toaster
      console.log(`Your team adopted ${producedOffline} more pugs while you were offline!`);
      this.ownedPugs.set(gameState.ownedPugs + producedOffline);
    } else {
      this.productionTiers.update((tiers) => {
        Object.keys(PRODUCTION_TIER_BY_CODE).forEach((code) => (tiers[code] = 0));
        return { ...tiers };
      });
    }
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
}
