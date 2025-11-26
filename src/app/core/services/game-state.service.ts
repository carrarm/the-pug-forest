import { computed, Injectable, signal } from '@angular/core';

import { PRODUCTION_TIER_BY_CODE } from '@data/production-tiers.data';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  public readonly ownedPugs = signal(0);
  public readonly totalSpent = signal(0);
  public readonly productionTiers = signal<Record<string, number>>({});
  public readonly upgradeTiers = signal<Record<string, number>>({});
  public readonly prestiges = signal<Record<string, number>>({});
  public readonly achievements = signal<Record<string, number>>({});

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
      this.totalSpent.set(gameState.totalSpent);
      this.productionTiers.set(gameState.productionTiers);
      this.upgradeTiers.set(gameState.upgradeTiers);
      this.prestiges.set(gameState.prestiges);
      this.achievements.set(gameState.achievements);

      const elapsedTimeMs = Date.now() - gameState.lastProductionDate;
      const producedOffline = (elapsedTimeMs / 1000) * this.pugsPerSecond();
      console.log(`Your team adopted ${producedOffline} more pugs while you were offline!`);
      this.ownedPugs.set(gameState.ownedPugs + producedOffline);
    }
  }

  public saveState(): void {
    const gameState = {
      ownedPugs: this.ownedPugs(),
      totalSpent: this.totalSpent(),
      lastProductionDate: Date.now(),
      productionTiers: this.productionTiers(),
      upgradeTiers: this.upgradeTiers(),
      prestiges: this.prestiges(),
      achievements: this.achievements(),
    };
    localStorage.setItem('gameState', JSON.stringify(gameState));
  }
}
