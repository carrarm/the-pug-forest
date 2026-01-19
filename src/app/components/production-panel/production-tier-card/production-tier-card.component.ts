import { Component, computed, inject, input, output } from '@angular/core';

import { PurchaseCard } from '@components/purchase-card/purchase-card';
import { TierService } from '@core/services/tier';
import { ShortNumberPipe } from '@core/pipes/short-number-pipe';
import { ProductionTier } from '@model';

@Component({
  selector: 'app-production-tier-card',
  imports: [PurchaseCard, ShortNumberPipe],
  templateUrl: './production-tier-card.component.html',
  styleUrl: './production-tier-card.component.css',
  providers: [ShortNumberPipe],
})
export class ProductionTierCard {
  public readonly tier = input.required<ProductionTier>();
  public readonly owned = input.required<number>();
  public readonly multiplier = input.required<number>();
  public readonly discovered = input(true);
  public readonly purchase = output<void>();

  private readonly tierService = inject(TierService);

  protected readonly image = computed(() => `production-tiers/${this.tier().code}.png`);

  protected readonly cost = computed(() =>
    this.tierService.computeProductionTierCost(
      this.multiplier(),
      this.tier().baseCost,
      this.owned(),
    ),
  );

  protected readonly baseProduction = computed(() => {
    return this.tierService.computeBaseProduction(this.tier().code);
  });

  protected readonly currentProduction = computed(() => {
    return this.tier().production * this.owned();
  });
}
