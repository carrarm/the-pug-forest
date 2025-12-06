import { Component, computed, inject, input, output, signal } from '@angular/core';
import { Tier } from '@model';
import { ShortNumberPipe } from '@core/pipes/short-number-pipe';
import { GameStateService } from '@core/services/game-state.service';

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
  public readonly purchase = output<void>();

  protected readonly gameState = inject(GameStateService);

  private readonly shortNumberPipe = inject(ShortNumberPipe);

  protected readonly detailExpanded = signal(false);

  protected readonly tooltip = computed(
    () => `Purchase x${this.multiplier()} for ${this.shortNumberPipe.transform(this.cost())} pugs`,
  );

  protected purchaseTier(event: Event): void {
    // Cancel event to prevent detail expansion/collapse
    event.stopImmediatePropagation();
    this.purchase.emit();
  }
}
