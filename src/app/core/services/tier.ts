import { computed, inject, Injectable } from '@angular/core';
import { ProductionTier } from '@model';
import { GameStateService } from '@core/services/game-state';

const PRODUCTION_COST_SCALING_FACTOR = 1.07;
const UPGRADE_COST_SCALING_FACTOR = 3;
const REQUIRED_OWNED_UPGRADES = [10, 50, 100, 150, 200, 300, 400, 500, 800, 1000];

@Injectable({
  providedIn: 'root',
})
export class TierService {
  private readonly gameState = inject(GameStateService);

  public readonly clickProduction = computed(() => {
    const clickUpgrade = this.gameState.upgradeTiers()['TRAVELER_AURA'];
    return Math.pow(clickUpgrade.multiplier, clickUpgrade.owned);
  });

  public readonly productionPerSecond = computed(() => {
    let production = 0;
    const productionTiers = this.gameState.productionTiers();
    for (const tier in productionTiers) {
      production += productionTiers[tier].owned * this.computeBaseProduction(productionTiers[tier]);
    }
    return production;
  });

  public computeBaseProduction(tier: ProductionTier): number {
    const upgrade = Object.values(this.gameState.upgradeTiers()).find(
      (upgrade) => upgrade.affects === tier.code,
    );
    const upgradeMultiplier = upgrade ? Math.pow(upgrade.multiplier, upgrade.owned) : 1;
    return tier.production * upgradeMultiplier;
  }

  public computeOfflineProduction(): number {
    const elapsedTimeMs = Date.now() - this.gameState.lastProductionDate();
    return (
      (elapsedTimeMs / 1000) *
      this.productionPerSecond() *
      (this.gameState.offlineGainPercent() / 100)
    );
  }

  public computeProductionTierCost(amount: number, baseCost: number, owned: number): number {
    // cost(n) + cost(n+1) + ... is a geometric-series
    // Geometric-series formula: S =  (r^(n+1) - 1) / (r - 1) with r = scaling factor
    // Use n instead of n+1 to consider "n" a single term rather than an offset (base convention)
    // and avoid to double-count n = 1
    const geometricSeriesCost =
      (Math.pow(PRODUCTION_COST_SCALING_FACTOR, amount) - 1) / (PRODUCTION_COST_SCALING_FACTOR - 1);
    return Math.round(
      baseCost * Math.pow(PRODUCTION_COST_SCALING_FACTOR, owned) * geometricSeriesCost,
    );
  }

  public computeUpgradeTierCost(baseCost: number, owned: number): number {
    return baseCost * Math.pow(UPGRADE_COST_SCALING_FACTOR, owned);
  }

  public computeUpgradeTierRequirement(ownedUpgrades: number): number {
    return REQUIRED_OWNED_UPGRADES[ownedUpgrades];
  }
}
