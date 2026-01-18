import { Component, computed, inject, signal } from '@angular/core';

import { UpgradeTierCard } from '@components/upgrade-panel/upgrade-tier-card/upgrade-tier-card';
import { GameStateService } from '@core/services/game-state';
import { TierService } from '@core/services/tier';
import { UpgradeTier } from '@model';

@Component({
  selector: 'app-upgrade-panel',
  imports: [UpgradeTierCard],
  templateUrl: './upgrade-panel.html',
  styleUrl: './upgrade-panel.css',
})
export class UpgradePanel {
  protected readonly gameState = inject(GameStateService);
  protected readonly tierService = inject(TierService);

  protected readonly upgradeTiers = computed(() => {
    return Object.values(this.gameState.upgradeTiers()).map((tier: UpgradeTier) => {
      let isDiscovered = true;
      if (tier.affects && tier.affects !== 'NEIGHBORHOOD_KIDS') {
        isDiscovered = this.tierService.productionTierDiscovered(tier.affects);
      }
      return { ...tier, isDiscovered };
    });
  });

  protected purchaseUpgradeTier(tier: UpgradeTier): void {
    const owned = this.gameState.upgradeTiers()[tier.code].owned;
    this.gameState.upgradeTiers.update((tiers) => {
      const updatedTiers = { ...tiers };
      updatedTiers[tier.code].owned++;
      return updatedTiers;
    });
    const totalPurchaseCost = this.tierService.computeProductionTierCost(1, tier.baseCost, owned);
    this.gameState.buy(totalPurchaseCost);
  }
}
