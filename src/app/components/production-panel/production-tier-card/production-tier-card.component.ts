import { Component, computed, inject, input, output } from '@angular/core';

import { GameStateService } from '@core/services/game-state.service';
import { TierService } from '@core/services/tier.service';
import { ShortNumberPipe } from '@core/pipes/short-number-pipe';
import { ProductionTier } from '@model';

interface Amount {
  label: string;
  value: number;
  tooltip: string;
  canPurchase: boolean;
}

@Component({
  selector: 'app-production-tier-card',
  imports: [ShortNumberPipe],
  templateUrl: './production-tier-card.component.html',
  styleUrl: './production-tier-card.component.css',
  providers: [ShortNumberPipe],
})
export class ProductionTierCard {
  public readonly tier = input.required<ProductionTier>();
  public readonly owned = input.required<number>();
  public readonly multiplier = input.required<number>();
  public readonly purchase = output<void>();

  private readonly gameState = inject(GameStateService);
  private readonly tierService = inject(TierService);
  private readonly shortNumberPipe = inject(ShortNumberPipe);

  protected readonly canPurchase = computed(() => this.gameState.ownedPugs() >= this.cost());
  protected readonly tooltip = computed(
    () => `Purchase x${this.multiplier()} for ${this.shortNumberPipe.transform(this.cost())} pugs`,
  );

  protected readonly cost = computed(() =>
    this.tierService.computeAmountCost(this.multiplier(), this.tier().baseCost, this.owned()),
  );

  protected readonly currentProduction = computed(() => {
    return this.tier().production * this.owned();
  });

  protected detailExpanded = false;

  protected purchaseTier(event: Event): void {
    event.stopImmediatePropagation();
    this.purchase.emit();
  }
}
