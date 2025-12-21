import { Component, computed, inject, input, numberAttribute, output, signal } from '@angular/core';
import { Tier } from '@model';
import { ShortNumberPipe } from '@core/pipes/short-number-pipe';
import { GameStateService } from '@core/services/game-state';

@Component({
  selector: 'app-purchase-card',
  imports: [ShortNumberPipe],
  templateUrl: './purchase-card.html',
  styleUrl: './purchase-card.css',
  providers: [ShortNumberPipe],
})
export class PurchaseCard {
  public readonly tier = input.required<Tier>();
  public readonly cost = input.required<number>();
  public readonly multiplier = input.required<number>();
  public readonly image = input.required<string>();
  public readonly maxOwned = input(0, { transform: numberAttribute });
  public readonly canPurchase = input(true);
  public readonly purchase = output<void>();

  protected readonly gameState = inject(GameStateService);

  private readonly shortNumberPipe = inject(ShortNumberPipe);

  protected readonly detailExpanded = signal(false);
  protected readonly maxReached = computed(
    () => !!this.maxOwned() && this.tier().owned >= this.maxOwned()!,
  );
  protected readonly requiredCostMatched = computed(
    () => this.gameState.ownedPugs() >= this.cost(),
  );
  protected readonly canPurchaseNext = computed(
    () => this.canPurchase() && this.requiredCostMatched() && !this.maxReached(),
  );
  protected readonly tooltip = computed(
    () => `Purchase x${this.multiplier()} for ${this.shortNumberPipe.transform(this.cost())} pugs`,
  );

  // TODO: change through settings
  protected readonly textDescriptionVisible = signal(true);

  protected purchaseTier(event: Event): void {
    // Cancel event to prevent detail expansion/collapse
    event.stopImmediatePropagation();
    this.purchase.emit();
  }
}
