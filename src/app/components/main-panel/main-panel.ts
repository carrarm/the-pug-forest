import { Component, inject, input } from '@angular/core';

import { GameStateService } from '@core/services/game-state.service';
import { ShortNumberPipe } from '@core/pipes/short-number-pipe';
import { Device } from '@model';
import { TierService } from '@core/services/tier.service';

@Component({
  selector: 'app-main-panel',
  imports: [ShortNumberPipe],
  templateUrl: './main-panel.html',
  styleUrl: './main-panel.css',
})
export class MainPanel {
  public readonly device = input.required<Device>();

  protected readonly gameState = inject(GameStateService);
  protected readonly tierService = inject(TierService);

  protected visitForest(): void {
    this.gameState.ownedPugs.update((owned) => owned + this.tierService.clickProduction());
    this.gameState.statistics.update((stats) => {
      const firstClick = stats.firstClickDate ?? Date.now();
      return { ...stats, totalClicks: stats.totalClicks + 1, firstClickDate: firstClick };
    });
  }
}
