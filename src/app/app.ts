import { Component, effect, HostListener, inject, OnInit, signal } from '@angular/core';

import { ShortNumberPipe } from '@core/pipes/short-number-pipe';
import { GameStateService } from '@core/services/game-state';
import { TierService } from '@core/services/tier';
import { ACHIEVEMENTS } from '@data/achievements.data';
import { Device } from '@model';

import { DesktopLayout } from './layout/desktop-layout/desktop-layout';
import { MobileLayout } from './layout/mobile-layout/mobile-layout';
import { SettingsService } from '@core/services/settings.service';
import { MusicService } from '@core/services/music';
import { Popup } from '@components/popup/popup';

@Component({
  selector: 'app-root',
  imports: [DesktopLayout, MobileLayout, Popup, ShortNumberPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private readonly gameState = inject(GameStateService);
  private readonly musicService = inject(MusicService);
  private readonly settings = inject(SettingsService);
  private readonly tierService = inject(TierService);

  protected readonly layout = signal<Device>('DESKTOP');
  protected readonly offlineGains = signal(0);

  protected popupType: 'firstConnection' | 'offlineGains' | 'noGains' = 'firstConnection';
  protected popupOpen = true;

  constructor() {
    effect(() => {
      if (this.settings.musicEnabled()) {
        this.musicService.startMusic();
      } else {
        this.musicService.stopMusic();
      }
    });
  }

  public ngOnInit() {
    this.changeLayout();

    const offlinePugs = this.computeOfflinePugs();

    this.gameState.ownedPugs.update((owned) => owned + offlinePugs);

    if (this.gameState.statistics().totalClicks > 0) {
      this.popupType = offlinePugs === 0 ? 'noGains' : 'offlineGains';
    }

    setInterval(() => {
      const addedPugs = this.tierService.productionPerSecond();
      this.gameState.ownedPugs.update((owned) => owned + addedPugs);
      this.gameState.statistics.update((stats) => ({
        ...stats,
        totalPugs: stats.totalPugs + addedPugs,
      }));
      this.trackAchievements();
      this.gameState.saveState();
    }, 1000);
  }

  @HostListener('window:resize')
  public onResize() {
    this.changeLayout();
  }

  protected closePopup(): void {
    this.popupOpen = false;
    this.musicService.startMusic();
  }

  private changeLayout(): void {
    const expectedLayout = window.innerWidth > 1000 ? 'DESKTOP' : 'MOBILE';
    if (expectedLayout !== this.layout()) {
      this.layout.set(expectedLayout);
    }
  }

  private computeOfflinePugs(): number {
    const producedOffline = this.tierService.computeOfflineProduction();
    this.offlineGains.set(producedOffline);
    return producedOffline;
  }

  private trackAchievements() {
    const gameState = this.gameState.getGameState();
    this.gameState.achievements.update((currentAchievements) => {
      ACHIEVEMENTS.forEach((achievement) => {
        if (achievement.unlocked(gameState)) {
          currentAchievements[achievement.name] = true;
        }
      });
      return { ...currentAchievements };
    });
  }
}
