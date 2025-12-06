import { Component, inject, signal } from '@angular/core';

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
  protected readonly productionTiers = PRODUCTION_TIERS;

  protected readonly gameState = inject(GameStateService);

  private readonly tierService = inject(TierService);

  protected readonly purchaseMultiplier = signal(1);

  protected purchaseProductionTier(tier: ProductionTier): void {
    const owned = this.gameState.productionTiers()[tier.code] ?? 0;
    this.gameState.productionTiers.update((tiers) => {
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
