import { Injectable, signal } from '@angular/core';

interface Settings {
  animations: boolean;
  backgroundAnimations: boolean;
  music: boolean;
  volume: number;
  compactCards: boolean;
}

const STORAGE_KEY = 'settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public readonly animationsEnabled = signal(true);
  public readonly animatedBackgroundEnabled = signal(true);
  public readonly musicEnabled = signal(true);
  public readonly musicVolume = signal(1);
  public readonly compactCards = signal(false);

  constructor() {
    this.restoreSettings();
  }

  public saveSettings(): void {
    const settings: Settings = {
      animations: this.animationsEnabled(),
      backgroundAnimations: this.animatedBackgroundEnabled(),
      music: this.musicEnabled(),
      compactCards: this.compactCards(),
      volume: this.musicVolume(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }

  private restoreSettings(): void {
    const rawSettings = localStorage.getItem(STORAGE_KEY);
    if (rawSettings) {
      const parsed = JSON.parse(rawSettings);
      this.musicEnabled.set(parsed.music);
      this.compactCards.set(parsed.compactCards);
      this.musicVolume.set(parsed.volume);
      this.animationsEnabled.set(parsed.animations);
      this.animatedBackgroundEnabled.set(parsed.backgroundAnimations);
    }
  }
}
