import { Component, computed, inject, input, output } from '@angular/core';
import { ShortNumberPipe } from '@core/pipes/short-number-pipe';
import { GameStateService } from '@core/services/game-state.service';
import { TierService } from '@core/services/tier.service';

@Component({
  selector: 'app-upgrade-tier-card',
  imports: [ShortNumberPipe],
  templateUrl: './upgrade-tier-card.html',
  styleUrl: './upgrade-tier-card.css',
})
export class UpgradeTierCard {
  public readonly title = input.required<string>();
  public readonly image = input<string>();
  public readonly description = input.required<string>();
  public readonly cost = input.required<number>();
  public readonly owned = input.required<number>();
  public readonly purchase = output<void>();

  protected readonly gameState = inject(GameStateService);

  private readonly tierService = inject(TierService);

  protected readonly currentCost = computed(() =>
    this.tierService.computeCurrentCost(this.cost(), this.owned()),
  );
}
