import { Injectable, signal } from '@angular/core';

interface Settings {
  music: boolean;
  compactCards: boolean;
}

const STORAGE_KEY = 'settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public readonly musicEnabled = signal(true);
  public readonly compactCards = signal(false);

  constructor() {
    this.restoreSettings();
  }

  public saveSettings(): void {
    const settings: Settings = {
      music: this.musicEnabled(),
      compactCards: this.compactCards(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }

  private restoreSettings(): void {
    const rawSettings = localStorage.getItem(STORAGE_KEY);
    if (rawSettings) {
      const parsed = JSON.parse(rawSettings);
      this.musicEnabled.set(parsed.music);
      this.compactCards.set(parsed.compactCards);
    }
  }
}
