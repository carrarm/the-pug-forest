import { Component, computed, inject } from '@angular/core';

import { UpgradeTierCard } from '@components/upgrade-panel/upgrade-tier-card/upgrade-tier-card';
import { GameStateService } from '@core/services/game-state';
import { TierService } from '@core/services/tier';
import { UPGRADE_TIER_BY_CODE } from '@data/upgrade-tiers.data';
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
    return Object.entries(this.gameState.upgradeTiers()).map(([tierCode, owned]) => {
      let isDiscovered = true;
      const upgradeTier = UPGRADE_TIER_BY_CODE[tierCode];
      if (upgradeTier.affects && upgradeTier.affects !== 'NEIGHBORHOOD_KIDS') {
        isDiscovered = this.tierService.productionTierDiscovered(upgradeTier.affects);
      }
      return { ...upgradeTier, owned, isDiscovered };
    });
  });

  protected purchaseUpgradeTier(tier: UpgradeTier): void {
    const owned = this.gameState.upgradeTiers()[tier.code];
    this.gameState.upgradeTiers.update((tiers) => {
      const updatedTiers = { ...tiers };
      updatedTiers[tier.code]++;
      return updatedTiers;
    });
    const totalPurchaseCost = this.tierService.computeProductionTierCost(1, tier.baseCost, owned);
    this.gameState.buy(totalPurchaseCost);
  }
}
