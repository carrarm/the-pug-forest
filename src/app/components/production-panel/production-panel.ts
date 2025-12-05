import { Component, inject } from '@angular/core';

import { ProductionTierCard } from '@components/production-panel/production-tier-card/production-tier-card.component';
import { GameStateService } from '@core/services/game-state.service';
import { TierService } from '@core/services/tier.service';
import { PRODUCTION_TIERS } from '@data/production-tiers.data';
import { ProductionTier } from '@model';

@Component({
  selector: 'app-production-panel',
  imports: [ProductionTierCard],
  templateUrl: './production-panel.html',
  styleUrl: './production-panel.css',
})
export class ProductionPanel {
  protected readonly productionTiers = PRODUCTION_TIERS;

  protected readonly gameState = inject(GameStateService);

  private readonly tierService = inject(TierService);

  protected purchaseProductionTier(tier: ProductionTier, amount: number): void {
    const owned = this.gameState.productionTiers()[tier.code] ?? 0;
    this.gameState.productionTiers.update((tiers) => {
      return { ...tiers, [tier.code]: (tiers[tier.code] ?? 0) + amount };
    });
    // FIXME: doesn't seem to compute the correct amount?
    const totalPurchaseCost = this.tierService.computeAmountCost(amount, tier.baseCost, owned);
    this.gameState.ownedPugs.update((owned) => owned - totalPurchaseCost);
    this.gameState.statistics.update((stats) => ({
      ...stats,
      totalSpent: stats.totalSpent + totalPurchaseCost,
    }));
  }
}
