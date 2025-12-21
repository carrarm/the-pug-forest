import { effect, inject, Injectable } from '@angular/core';
import { SettingsService } from '@core/services/settings.service';

const USER_INTERACTIONS = ['click', 'pointerdown', 'keydown', 'touchstart', 'wheel'];

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  private readonly audio = new Audio('background-music.mp3');

  private readonly settings = inject(SettingsService);

  private ready = false;

  constructor() {
    this.audio.loop = true;

    // Audio will be ready after any interaction from the user
    USER_INTERACTIONS.forEach((event) => {
      window.addEventListener(event, this.audioReady, { passive: true, once: true });
    });
  }

  public startMusic(): void {
    if (this.ready && this.settings.musicEnabled()) {
      this.audio.play().catch(console.error);
    }
  }

  public stopMusic(): void {
    this.audio.pause();
  }

  private audioReady = () => {
    this.ready = true;

    USER_INTERACTIONS.forEach((event) => {
      window.removeEventListener(event, this.audioReady);
    });

    this.startMusic();
  };
}
