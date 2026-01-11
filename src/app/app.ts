import { Component, effect, HostListener, inject, OnInit, signal } from '@angular/core';

import { ShortNumberPipe } from '@core/pipes/short-number-pipe';
import { Popup } from '@components/popup/popup';
import { Toaster } from '@components/toaster/toaster';
import { Debug } from '@core/services/debug';
import { GameStateService } from '@core/services/game-state';
import { MusicService } from '@core/services/music';
import { TierService } from '@core/services/tier';
import { SettingsService } from '@core/services/settings';
import { ACHIEVEMENTS } from '@data/achievements.data';
import { Achievement, Device } from '@model';

import { DesktopLayout } from './layout/desktop-layout/desktop-layout';
import { MobileLayout } from './layout/mobile-layout/mobile-layout';
import { AchievementCard } from '@components/achievement-card/achievement-card';

@Component({
  selector: 'app-root',
  imports: [AchievementCard, DesktopLayout, MobileLayout, Popup, ShortNumberPipe, Toaster],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private readonly debug = inject(Debug);
  private readonly gameState = inject(GameStateService);
  private readonly musicService = inject(MusicService);
  private readonly settings = inject(SettingsService);
  private readonly tierService = inject(TierService);

  protected readonly layout = signal<Device>('DESKTOP');
  protected readonly offlineGains = signal(0);
  protected notifiedAchievements = signal<Achievement[]>([]);

  protected popupType: 'firstConnection' | 'offlineGains' | 'noGains' = 'firstConnection';
  protected popupOpen = true;

  constructor() {
    effect(async () => {
      if (this.settings.musicEnabled()) {
        await this.musicService.startMusic();
        this.musicService.setVolume(this.settings.musicVolume());
      } else {
        this.musicService.stopMusic();
      }
    });
  }

  public ngOnInit() {
    this.debug.enableDebug();

    this.changeLayout();

    const offlinePugs = this.computeOfflinePugs();

    this.gameState.ownedPugs.update((owned) => owned + offlinePugs);

    if (this.gameState.statistics().currentRun.totalClicks > 0) {
      this.popupType = offlinePugs === 0 ? 'noGains' : 'offlineGains';
    }

    setInterval(() => {
      const addedPugs = this.tierService.productionPerSecond();
      this.gameState.ownedPugs.update((owned) => owned + addedPugs);
      this.gameState.statistics.update(({ allTimes, currentRun }) => ({
        allTimes: { ...allTimes, totalPugs: allTimes.totalPugs + addedPugs },
        currentRun: { ...currentRun, totalPugs: currentRun.totalPugs + addedPugs },
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

  private notifyAchievements(notifications: Achievement[]): void {
    const achievementNames = notifications.map((achievement) => achievement.name);
    this.notifiedAchievements.update((achievements) => [...achievements, ...notifications]);
    setTimeout(() => {
      this.notifiedAchievements.update((achievements) =>
        achievements.filter((achievement) => !achievementNames.includes(achievement.name)),
      );
    }, 3000);
  }

  private trackAchievements() {
    const gameState = this.gameState.getGameState();
    const notifications: Achievement[] = [];
    this.gameState.achievements.update((currentAchievements) => {
      ACHIEVEMENTS.forEach((achievement) => {
        if (achievement.unlocked(gameState)) {
          if (!currentAchievements[achievement.name]) {
            notifications.push(achievement);
          }
          currentAchievements[achievement.name] = true;
        }
      });
      return { ...currentAchievements };
    });
    if (notifications.length) {
      this.notifyAchievements(notifications);
    }
  }
}
