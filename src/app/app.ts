import { Component, inject, OnInit } from '@angular/core';

import { GameStateService } from '@core/services/game-state.service';
import { ACHIEVEMENTS } from '@data/achievements.data';

import { DesktopLayout } from './layout/desktop-layout/desktop-layout';

@Component({
  selector: 'app-root',
  imports: [DesktopLayout],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly gameState = inject(GameStateService);

  public ngOnInit() {
    setInterval(() => {
      this.gameState.ownedPugs.update((owned) => owned + this.gameState.pugsPerSecond());
      this.trackAchievements();
      this.gameState.saveState();
    }, 1000);
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
