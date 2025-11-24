import { Component, computed, inject, input, output } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { GameState, ProductionTier, UpgradeTier } from '@model';

interface Amount {
  label: string;
  value: number;
  tooltip: string;
  canPurchase: boolean;
}

interface CardDetail {
  title: string;
  description: string;
  cost: number;
  owned: number;
  production?: number;
}

@Component({
  selector: 'app-purchase-card',
  imports: [DecimalPipe],
  templateUrl: './purchase-card.html',
  styleUrl: './purchase-card.css',
  providers: [DecimalPipe],
})
export class PurchaseCard {
  //public readonly type = input.required<'production' | 'upgrade'>();
  //public readonly tier = input.required<ProductionTier | UpgradeTier>();

  public readonly title = input.required<string>();
  public readonly image = input<string>();
  public readonly description = input.required<string>();
  public readonly cost = input.required<number>();
  public readonly gameState = input.required<GameState>();
  public readonly owned = input.required<number>();
  public readonly production = input.required<number>();
  public readonly purchase = output<number>();

  protected readonly cardDetail = computed(() => {});

  private readonly decimalPipe = inject(DecimalPipe);

  protected readonly amounts = computed(() => {
    const currentCost = this.cost();
    const ownedPugs = this.gameState().ownedPugs;
    return [
      { label: 'x1', value: 1, tooltip: '', canPurchase: false },
      { label: 'x10', value: 10, tooltip: '', canPurchase: false },
      { label: 'x50', value: 50, tooltip: '', canPurchase: false },
    ].map((amount) => ({
      ...amount,
      tooltip: this.getTooltip(amount, currentCost),
      canPurchase: this.canPurchase(amount, currentCost, ownedPugs),
    }));
  });

  private canPurchase(amount: Amount, cost: number, pugs: number): boolean {
    const totalCost = amount.value * cost;
    return pugs >= totalCost;
  }

  private getTooltip(amount: Amount, cost: number): string {
    const totalCost = this.decimalPipe.transform(amount.value * cost);
    return `Purchase ${amount.label} for ${totalCost} pugs`;
  }
}
