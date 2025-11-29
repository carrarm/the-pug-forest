import { NgClass } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';

import { ShortNumberPipe } from '@core/pipes/short-number-pipe';
import { GameStateService } from '@core/services/game-state.service';

import { ProductionPanel } from './components/production-panel/production-panel';
import { AchievementPanel } from './components/achievement-panel/achievement-panel';
import { GameState } from '@model';
import { ACHIEVEMENTS } from '@data/achievements.data';

type Panel = 'PRODUCTION' | 'UPGRADE' | 'PRESTIGE';

@Component({
  selector: 'app-root',
  imports: [AchievementPanel, NgClass, ProductionPanel, ShortNumberPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly gameState = inject(GameStateService);

  protected activePanel = signal<Panel>('PRODUCTION');

  public ngOnInit() {
    setInterval(() => {
      this.gameState.ownedPugs.update((owned) => owned + this.gameState.pugsPerSecond());
      this.trackAchievements();
      this.gameState.saveState();
    }, 1000);
  }

  protected visitForest(): void {
    this.gameState.ownedPugs.update((owned) => owned + 1);
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
