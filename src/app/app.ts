import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PurchaseCard } from './components/purchase-card/purchase-card';
import { PRODUCTION_TIERS } from './core/data/production-tiers.data';
import { GameState } from '@model';

@Component({
  selector: 'app-root',
  imports: [PurchaseCard],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // TODO: split in separate state props
  protected readonly gameState = signal<GameState>(this.getStartingGameState());
  protected readonly productionTiers = PRODUCTION_TIERS;

  protected visitForest(): void {
    this.gameState.update((state) => ({ ...state, ownedPugs: state.ownedPugs + 1 }));
  }

  private getStartingGameState(): GameState {
    // TODO Check if there's already one in storage
    return {
      achievements: {},
      lastProductionDate: '',
      ownedPugs: 0,
      prestiges: {},
      productionTiers: {},
      totalSpent: 0,
      upgradeTiers: {},
    };
  }
}
