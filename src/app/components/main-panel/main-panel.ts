import { Component, ElementRef, inject, input, viewChild } from '@angular/core';

import { ShortNumberPipe } from '@core/pipes/short-number-pipe';
import { GameStateService } from '@core/services/game-state';
import { TierService } from '@core/services/tier';
import { Device } from '@model';

@Component({
  selector: 'app-main-panel',
  imports: [ShortNumberPipe],
  templateUrl: './main-panel.html',
  styleUrl: './main-panel.css',
})
export class MainPanel {
  public readonly device = input.required<Device>();

  protected readonly visitForestText = viewChild.required<ElementRef>('visitForestText');

  protected readonly gameState = inject(GameStateService);
  protected readonly tierService = inject(TierService);

  protected visitForest(): void {
    this.animateGainsText();
    this.gameState.ownedPugs.update((owned) => owned + this.tierService.clickProduction());
    this.gameState.statistics.update((stats) => {
      const firstClick = stats.firstClickDate ?? Date.now();
      return { ...stats, totalClicks: stats.totalClicks + 1, firstClickDate: firstClick };
    });
  }

  private animateGainsText(): void {
    const animatedText = this.visitForestText().nativeElement as HTMLDivElement;
    animatedText.animate(
      [
        { transform: 'translate(-50%, 0)', opacity: 0 },
        { opacity: 1, offset: 0.3 },
        { transform: 'translate(-50%, -20px)', opacity: 0 },
      ],
      {
        duration: 1000,
        easing: 'ease',
        fill: 'none',
      },
    );
  }
}
