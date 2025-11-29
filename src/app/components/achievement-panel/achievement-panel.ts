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
    const state: GameState = {
      ownedPugs: this.gameState.ownedPugs(),
      prestiges: this.gameState.prestiges(),
      productionTiers: this.gameState.productionTiers(),
      totalSpent: this.gameState.totalSpent(),
      upgradeTiers: this.gameState.upgradeTiers(),
    };
    return ACHIEVEMENTS.map((achievement) => ({
      ...achievement,
      isUnlocked: achievement.unlocked(state),
    }));
  });

  private readonly gameState = inject(GameStateService);
}
