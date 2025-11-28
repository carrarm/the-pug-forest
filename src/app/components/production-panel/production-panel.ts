import { Component, inject } from '@angular/core';
import { PurchaseCard } from '../purchase-card/purchase-card';
import { GameStateService } from '@core/services/game-state.service';
import { ProductionTier } from '@model';
import { TierService } from '@core/services/tier.service';
import { PRODUCTION_TIERS } from '@data/production-tiers.data';

@Component({
  selector: 'app-production-panel',
  imports: [PurchaseCard],
  templateUrl: './production-panel.html',
  styleUrl: './production-panel.css',
})
export class ProductionPanel {
  protected readonly productionTiers = PRODUCTION_TIERS;

  protected readonly gameState = inject(GameStateService);

  private readonly tierService = inject(TierService);

  protected purchaseProductionTier(tier: ProductionTier, amount: number): void {
    const owned = this.gameState.productionTiers()[tier.code];
    this.gameState.productionTiers.update((tiers) => {
      return { ...tiers, [tier.code]: (tiers[tier.code] ?? 0) + amount };
    });
    const totalPurchaseCost = this.tierService.computeCurrentCost(tier.baseCost, owned) * amount;
    this.gameState.ownedPugs.update((owned) => owned - totalPurchaseCost);
    this.gameState.totalSpent.update((total) => total + totalPurchaseCost);
  }
}
