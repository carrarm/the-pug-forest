import { Component, inject } from '@angular/core';
import { GameStateService } from '@core/services/game-state.service';
import { ShortNumberPipe } from '@core/pipes/short-number-pipe';

@Component({
  selector: 'app-main-panel',
  imports: [ShortNumberPipe],
  templateUrl: './main-panel.html',
  styleUrl: './main-panel.css',
})
export class MainPanel {
  protected readonly gameState = inject(GameStateService);

  protected visitForest(): void {
    this.gameState.ownedPugs.update((owned) => owned + 1);
  }
}
