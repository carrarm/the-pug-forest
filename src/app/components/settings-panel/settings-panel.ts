import { Component, inject } from '@angular/core';
import { GameStateService } from '@core/services/game-state';

@Component({
  selector: 'app-settings-panel',
  imports: [],
  templateUrl: './settings-panel.html',
  styleUrl: './settings-panel.css',
})
export class SettingsPanel {
  private readonly gameState = inject(GameStateService);

  protected resetState(): void {
    if (
      window.confirm(
        'Are you sure you want to reset the game? You will not be able to restore your data.',
      )
    ) {
      this.gameState.resetGame();
    }
  }
}
