import { Component, computed, inject } from '@angular/core';
import { DatePipe, NgTemplateOutlet, PercentPipe } from '@angular/common';

import { GameStateService } from '@core/services/game-state';
import { ACHIEVEMENTS } from '@data/achievements.data';
import { ShortNumberPipe } from '@core/pipes/short-number-pipe';

@Component({
  selector: 'app-stats-panel',
  imports: [DatePipe, PercentPipe, ShortNumberPipe, NgTemplateOutlet],
  templateUrl: './stats-panel.html',
  styleUrl: './stats-panel.css',
})
export class StatsPanel {
  protected readonly gameState = inject(GameStateService);

  protected readonly nbUnlockedAchievements = computed(
    () => Object.values(this.gameState.achievements()).filter((isUnlocked) => isUnlocked).length,
  );

  protected readonly achievementPercentage = computed(
    () => this.nbUnlockedAchievements() / ACHIEVEMENTS.length,
  );

  protected readonly nbAchievements = ACHIEVEMENTS.length;
}
