import { Component, inject, signal } from '@angular/core';

import { UpgradeTierCard } from '@components/upgrade-panel/upgrade-tier-card/upgrade-tier-card';
import { GameStateService } from '@core/services/game-state.service';
import { UPGRADE_TIERS } from '@data/upgrade-tiers.data';
import { UpgradeTier } from '@model';
import { TierService } from '@core/services/tier.service';
import { PurchaseMultiplier } from '@components/purchase-multiplier/purchase-multiplier';
import { PRODUCTION_TIERS } from '@data/production-tiers.data';

@Component({
  selector: 'app-upgrade-panel',
  imports: [PurchaseMultiplier, UpgradeTierCard],
  templateUrl: './upgrade-panel.html',
  styleUrl: './upgrade-panel.css',
})
export class UpgradePanel {
  protected readonly gameState = inject(GameStateService);
  protected readonly tierService = inject(TierService);

  protected readonly upgradeTiers = UPGRADE_TIERS;
  protected readonly purchaseMultiplier = signal(1);

  protected purchaseUpgradeTier(tier: UpgradeTier): void {
    const owned = this.gameState.upgradeTiers()[tier.code] ?? 0;
    this.gameState.upgradeTiers.update((tiers) => {
      return { ...tiers, [tier.code]: owned + this.purchaseMultiplier() };
    });
    const totalPurchaseCost = this.tierService.computeAmountCost(
      this.purchaseMultiplier(),
      tier.baseCost,
      owned,
    );
    this.gameState.buy(totalPurchaseCost);
  }
}
