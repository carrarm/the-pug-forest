import { inject, Injectable } from '@angular/core';

import { SettingsService } from '@core/services/settings';

const AUDIO_PATH = 'background-music.mp3';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  private readonly settings = inject(SettingsService);

  private audioContext?: AudioContext;
  private gain?: GainNode;

  /**
   * @param volume Between 0 and 1
   */
  public setVolume(volume: number): void {
    if (!this.audioContext || !this.gain) {
      return;
    }

    this.gain.gain.value = isNaN(volume) || volume > 1 || volume < 0 ? 1 : volume;
  }

  public async startMusic(): Promise<void> {
    if (!this.settings.musicEnabled()) {
      return;
    }

    await this.loadTrack();

    if (this.audioContext?.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  public async stopMusic(): Promise<void> {
    if (this.audioContext?.state === 'running') {
      await this.audioContext.suspend();
    }
  }

  private async loadTrack(): Promise<void> {
    if (this.audioContext) {
      return;
    }

    this.audioContext = new AudioContext();

    const httpResponse = await fetch(AUDIO_PATH);
    const arrayBuffer = await httpResponse.arrayBuffer();

    this.gain = this.audioContext.createGain();
    this.gain.gain.value = this.settings.musicVolume();
    this.gain.connect(this.audioContext.destination);

    const source = this.audioContext.createBufferSource();
    source.buffer = await this.audioContext.decodeAudioData(arrayBuffer);
    source.loop = true;
    source.connect(this.gain);
    source.start();
  }
}
