import { Component, computed, inject, input, output } from '@angular/core';

import { GameStateService } from '@core/services/game-state.service';
import { TierService } from '@core/services/tier.service';
import { ShortNumberPipe } from '@core/pipes/short-number-pipe';

interface Amount {
  label: string;
  value: number;
  tooltip: string;
  canPurchase: boolean;
}

@Component({
  selector: 'app-purchase-card',
  imports: [ShortNumberPipe],
  templateUrl: './purchase-card.html',
  styleUrl: './purchase-card.css',
  providers: [ShortNumberPipe],
})
export class PurchaseCard {
  public readonly title = input.required<string>();
  public readonly image = input<string>();
  public readonly description = input.required<string>();
  public readonly cost = input.required<number>();
  public readonly owned = input.required<number>();
  public readonly production = input.required<number>();
  public readonly purchase = output<number>();

  private readonly gameState = inject(GameStateService);
  private readonly tierService = inject(TierService);
  private readonly shortNumberPipe = inject(ShortNumberPipe);

  protected readonly amounts = computed(() => {
    const currentCost = this.currentCost();
    const ownedPugs = this.gameState.ownedPugs();
    return [
      { label: 'x1', value: 1, tooltip: '', canPurchase: false },
      { label: 'x10', value: 10, tooltip: '', canPurchase: false },
      { label: 'x25', value: 25, tooltip: '', canPurchase: false },
    ].map((amount) => ({
      ...amount,
      tooltip: this.getTooltip(amount, currentCost),
      canPurchase: this.canPurchase(amount, currentCost, ownedPugs),
    }));
  });

  protected readonly currentCost = computed(() =>
    this.tierService.computeCurrentCost(this.cost(), this.owned()),
  );

  protected readonly currentProduction = computed(() => {
    return this.production() * this.owned();
  });

  protected detailExpanded = false;

  protected purchaseTier(howMany: number, event: Event): void {
    event.stopImmediatePropagation();
    this.purchase.emit(howMany);
  }

  private canPurchase(amount: Amount, cost: number, pugs: number): boolean {
    const totalCost = amount.value * cost;
    return pugs >= totalCost;
  }

  private getTooltip(amount: Amount, cost: number): string {
    const totalCost = this.shortNumberPipe.transform(amount.value * cost);
    return `Purchase ${amount.label} for ${totalCost} pugs`;
  }
}
