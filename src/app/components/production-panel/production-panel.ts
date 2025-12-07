import { Component, computed, inject, signal } from '@angular/core';

import { ProductionTierCard } from '@components/production-panel/production-tier-card/production-tier-card.component';
import { GameStateService } from '@core/services/game-state.service';
import { TierService } from '@core/services/tier.service';
import { PRODUCTION_TIERS } from '@data/production-tiers.data';
import { ProductionTier } from '@model';
import { PurchaseMultiplier } from '@components/purchase-multiplier/purchase-multiplier';

@Component({
  selector: 'app-production-panel',
  imports: [ProductionTierCard, PurchaseMultiplier],
  templateUrl: './production-panel.html',
  styleUrl: './production-panel.css',
})
export class ProductionPanel {
  protected readonly gameState = inject(GameStateService);

  private readonly tierService = inject(TierService);

  protected readonly productionTiers = computed(() =>
    Object.values(this.gameState.productionTiers()),
  );

  protected readonly purchaseMultiplier = signal(1);

  protected purchaseProductionTier(tier: ProductionTier): void {
    const owned = this.gameState.productionTiers()[tier.code].owned;
    this.gameState.productionTiers.update((tiers) => {
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
