import { effect, inject, Injectable } from '@angular/core';
import { SettingsService } from '@core/services/settings.service';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  private readonly audio = new Audio('background-music.mp3');

  private readonly settings = inject(SettingsService);

  constructor() {
    this.audio.loop = true;
  }

  public startMusic(): void {
    if (this.settings.musicEnabled()) {
      this.audio.play().catch(console.error);
    }
  }

  public stopMusic(): void {
    this.audio.pause();
  }
}
