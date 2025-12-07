import { computed, inject, Injectable } from '@angular/core';
import { ProductionTier } from '@model';
import { GameStateService } from '@core/services/game-state.service';
import { UPGRADE_TIERS } from '@data/upgrade-tiers.data';
import { PRODUCTION_TIERS } from '@data/production-tiers.data';

const COST_SCALING_FACTOR = 1.07;

@Injectable({
  providedIn: 'root',
})
export class TierService {
  private readonly gameState = inject(GameStateService);

  public readonly productionPerSecond = computed(() => {
    let production = 0;
    const productionTiers = this.gameState.productionTiers();
    for (const tier in productionTiers) {
      production += productionTiers[tier].owned * this.computeBaseProduction(productionTiers[tier]);
    }
    return production;
  });

  public computeCost(amount: number, baseCost: number, owned: number): number {
    // cost(n) + cost(n+1) + ... is a geometric-series
    // Geometric-series formula: S =  (r^(n+1) - 1) / (r - 1) with r = scaling factor
    // Use n instead of n+1 to consider "n" a single term rather than an offset (base convention)
    // and avoid to double-count n = 1
    const geometricSeriesCost =
      (Math.pow(COST_SCALING_FACTOR, amount) - 1) / (COST_SCALING_FACTOR - 1);
    return Math.round(baseCost * Math.pow(COST_SCALING_FACTOR, owned) * geometricSeriesCost);
  }

  public computeBaseProduction(tier: ProductionTier): number {
    const upgrade = Object.values(this.gameState.upgradeTiers()).find(
      (upgrade) => upgrade.affects === tier.code,
    );
    if (!upgrade) {
      return 0;
    }
    return upgrade.owned > 0
      ? tier.production * upgrade.multiplier * upgrade.owned
      : tier.production;
  }
}
