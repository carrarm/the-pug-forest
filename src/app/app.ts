import { Component, computed, HostListener, inject, OnInit, signal } from '@angular/core';

import { GameStateService } from '@core/services/game-state.service';
import { ACHIEVEMENTS } from '@data/achievements.data';
import { Device } from '@model';

import { DesktopLayout } from './layout/desktop-layout/desktop-layout';
import { MobileLayout } from './layout/mobile-layout/mobile-layout';
import { TierService } from '@core/services/tier.service';

@Component({
  selector: 'app-root',
  imports: [DesktopLayout, MobileLayout],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private readonly gameState = inject(GameStateService);
  private readonly tierService = inject(TierService);

  protected readonly layout = signal<Device>('DESKTOP');

  public ngOnInit() {
    this.changeLayout();

    this.gameState.ownedPugs.update((owned) => owned + this.computeOfflinePugs());

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

  private changeLayout(): void {
    const expectedLayout = window.innerWidth > 1000 ? 'DESKTOP' : 'MOBILE';
    if (expectedLayout !== this.layout()) {
      this.layout.set(expectedLayout);
    }
  }

  private computeOfflinePugs(): number {
    const producedOffline = this.tierService.computeOfflineProduction();

    // TODO: display as toaster
    console.log(`Your team adopted ${producedOffline} more pugs while you were offline!`);

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
