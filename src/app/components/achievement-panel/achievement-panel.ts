import { Component, computed, inject } from '@angular/core';

import { AchievementCard } from '@components/achievement-card/achievement-card';
import { GameStateService } from '@core/services/game-state';
import { ACHIEVEMENTS } from '@data/achievements.data';
import { GameState } from '@model';

@Component({
  selector: 'app-achievement-panel',
  imports: [AchievementCard],
  templateUrl: './achievement-panel.html',
  styleUrl: './achievement-panel.css',
})
export class AchievementPanel {
  protected readonly achievements = computed(() => {
    const state: GameState = this.gameState.getGameState();
    return ACHIEVEMENTS.map((achievement) => ({
      ...achievement,
      isUnlocked: state.achievements[achievement.name],
    }));
  });

  private readonly gameState = inject(GameStateService);
}
