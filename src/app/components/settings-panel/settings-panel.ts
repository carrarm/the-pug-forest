import { DatePipe, PercentPipe } from '@angular/common';
import { Component, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Popup } from '@components/popup/popup';
import { Toaster } from '@components/toaster/toaster';
import { ExportedData, GameStateService } from '@core/services/game-state';
import { SettingsService } from '@core/services/settings';
import { readJsonFile, saveObject } from '@core/services/utils/file-utils';
import { countMatching, identity } from '@core/services/utils/general-utils';
import { GameState } from '@model';
import { ACHIEVEMENTS } from '@data/achievements.data';

@Component({
  selector: 'app-settings-panel',
  imports: [FormsModule, Popup, Toaster, DatePipe, PercentPipe],
  templateUrl: './settings-panel.html',
  styleUrl: './settings-panel.css',
})
export class SettingsPanel {
  private readonly gameState = inject(GameStateService);
  private readonly settings = inject(SettingsService);

  private readonly exportToaster = viewChild.required<Toaster>('exportToaster');
  private readonly importToaster = viewChild.required<Toaster>('importToaster');

  protected readonly importPanelVisible = signal(false);
  protected readonly pendingBackupDate = signal<number | undefined>(undefined);
  protected readonly pendingBackupState = signal<string[]>([]);
  protected readonly version = this.gameState.appVersion();

  protected animationsEnabled = this.settings.animationsEnabled();
  protected animatedBackgroundEnabled = this.settings.animatedBackgroundEnabled();
  protected compactCardsEnabled = this.settings.compactCards();
  protected musicEnabled = this.settings.musicEnabled();
  protected musicVolume = this.settings.musicVolume();

  private pendingBackupImport?: ExportedData;

  protected closeImportPanel(): void {
    this.importPanelVisible.set(false);
    this.pendingBackupState.set([]);
    this.pendingBackupDate.set(undefined);
    this.pendingBackupImport = undefined;
  }

  protected exportGame(): void {
    const exportedData = this.gameState.exportData();
    saveObject(exportedData, 'pug-forest.backup');
    this.exportToaster().showToaster(5000);
  }

  protected readFile(fileEvent: Event): void {
    this.pendingBackupImport = undefined;
    this.pendingBackupDate.set(undefined);
    const selectedFiles = (fileEvent.target as HTMLInputElement).files;
    if (selectedFiles?.length) {
      readJsonFile<ExportedData>(selectedFiles[0]).then((fileContent) => {
        this.pendingBackupImport = fileContent;
        const backupState = this.gameState.decryptState(fileContent.data);
        this.pendingBackupDate.set(backupState.lastProductionDate);
        this.pendingBackupState.set(this.getBackupInfo(backupState));
      });
    }
  }

  protected resetState(): void {
    if (window.confirm('Are you sure you want to reset the game? This action cannot be undone.')) {
      this.gameState.resetGame();
    }
  }

  protected restoreGameData(): void {
    const confirmMessage =
      'Are you sure you want to restore data from the selected file? This action cannot be undone.';
    if (this.pendingBackupImport && window.confirm(confirmMessage)) {
      this.gameState.restoreData(this.pendingBackupImport);
      this.importToaster().showToaster();
      this.closeImportPanel();
    }
  }

  protected saveSettings(): void {
    this.settings.musicEnabled.set(this.musicEnabled);
    this.settings.musicVolume.set(this.musicVolume);
    this.settings.compactCards.set(this.compactCardsEnabled);
    this.settings.animatedBackgroundEnabled.set(this.animatedBackgroundEnabled);
    this.settings.animationsEnabled.set(this.animationsEnabled);
    this.settings.saveSettings();
  }

  private getBackupInfo(backup: GameState): string[] {
    const achievements = Object.values(backup.achievements);

    return [
      `Started on ${new Date(backup.statistics.firstClickDate).toDateString()}`,
      `Prestiged ${backup.statistics.totalPrestiges} time(s)`,
      `${countMatching(achievements, identity)}/${ACHIEVEMENTS.length} achievements`,
    ];
  }
}
