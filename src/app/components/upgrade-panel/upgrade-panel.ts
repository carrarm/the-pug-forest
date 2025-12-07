import { Component, computed, inject, signal } from '@angular/core';

import { PurchaseMultiplier } from '@components/purchase-multiplier/purchase-multiplier';
import { UpgradeTierCard } from '@components/upgrade-panel/upgrade-tier-card/upgrade-tier-card';
import { GameStateService } from '@core/services/game-state.service';
import { TierService } from '@core/services/tier.service';
import { UPGRADE_TIERS } from '@data/upgrade-tiers.data';
import { UpgradeTier } from '@model';

@Component({
  selector: 'app-upgrade-panel',
  imports: [PurchaseMultiplier, UpgradeTierCard],
  templateUrl: './upgrade-panel.html',
  styleUrl: './upgrade-panel.css',
})
export class UpgradePanel {
  protected readonly gameState = inject(GameStateService);
  protected readonly tierService = inject(TierService);

  protected readonly upgradeTiers = computed(() => Object.values(this.gameState.upgradeTiers()));

  protected readonly purchaseMultiplier = signal(1);

  protected purchaseUpgradeTier(tier: UpgradeTier): void {
    const owned = this.gameState.upgradeTiers()[tier.code].owned;
    this.gameState.upgradeTiers.update((tiers) => {
      const updatedTiers = { ...tiers };
      updatedTiers[tier.code].owned += this.purchaseMultiplier();
      return updatedTiers;
    });
    const totalPurchaseCost = this.tierService.computeCost(
      this.purchaseMultiplier(),
      tier.baseCost,
      owned,
    );
    this.gameState.buy(totalPurchaseCost);
  }
}
