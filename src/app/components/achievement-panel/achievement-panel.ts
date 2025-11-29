import { Component, computed, inject } from '@angular/core';
import { NgClass } from '@angular/common';

import { ACHIEVEMENTS } from '@data/achievements.data';
import { GameStateService } from '@core/services/game-state.service';
import { GameState } from '@model';

@Component({
  selector: 'app-achievement-panel',
  imports: [NgClass],
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
