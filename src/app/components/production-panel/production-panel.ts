import { Component, computed, inject, signal } from '@angular/core';

import { ProductionTierCard } from '@components/production-panel/production-tier-card/production-tier-card.component';
import { PurchaseMultiplier } from '@components/purchase-multiplier/purchase-multiplier';
import { GameStateService } from '@core/services/game-state';
import { TierService } from '@core/services/tier';
import { PRODUCTION_TIER_BY_CODE } from '@data/production-tiers.data';
import { ProductionTier } from '@model';

@Component({
  selector: 'app-production-panel',
  imports: [ProductionTierCard, PurchaseMultiplier],
  templateUrl: './production-panel.html',
  styleUrl: './production-panel.css',
})
export class ProductionPanel {
  protected readonly gameState = inject(GameStateService);

  private readonly tierService = inject(TierService);

  protected readonly productionTiers = computed(() => {
    return Object.entries(this.gameState.productionTiers()).map(([tierCode, owned]) => {
      const tierInfo = PRODUCTION_TIER_BY_CODE[tierCode];
      return {
        ...tierInfo,
        owned,
        isDiscovered: this.tierService.productionTierDiscovered(tierCode),
      };
    });
  });

  protected readonly purchaseMultiplier = signal(1);

  protected purchaseProductionTier(tier: ProductionTier): void {
    const owned = this.gameState.productionTiers()[tier.code];
    this.gameState.productionTiers.update((tiers) => {
      const updatedTiers = { ...tiers };
      updatedTiers[tier.code] += this.purchaseMultiplier();
      return updatedTiers;
    });
    const totalPurchaseCost = this.tierService.computeProductionTierCost(
      this.purchaseMultiplier(),
      tier.baseCost,
      owned,
    );
    this.gameState.buy(totalPurchaseCost);
  }
}
