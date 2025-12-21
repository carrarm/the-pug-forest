import { Component, inject } from '@angular/core';
import { GameStateService } from '@core/services/game-state';
import { SettingsService } from '@core/services/settings.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings-panel',
  imports: [FormsModule],
  templateUrl: './settings-panel.html',
  styleUrl: './settings-panel.css',
})
export class SettingsPanel {
  private readonly gameState = inject(GameStateService);
  private readonly settings = inject(SettingsService);

  protected musicEnabled = this.settings.musicEnabled();

  protected saveSettings(): void {
    this.settings.musicEnabled.set(this.musicEnabled);
    this.settings.saveSettings();
  }

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
