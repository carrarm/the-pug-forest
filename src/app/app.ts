import { NgClass } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';

import { ShortNumberPipe } from '@core/pipes/short-number-pipe';
import { GameStateService } from '@core/services/game-state.service';

import { ProductionPanel } from './components/production-panel/production-panel';

type Panel = 'PRODUCTION' | 'UPGRADE' | 'PRESTIGE';

@Component({
  selector: 'app-root',
  imports: [NgClass, ProductionPanel, ShortNumberPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly gameState = inject(GameStateService);

  protected activePanel = signal<Panel>('PRODUCTION');

  public ngOnInit() {
    setInterval(() => {
      this.gameState.ownedPugs.update((owned) => owned + this.gameState.pugsPerSecond());
      this.gameState.saveState();
    }, 1000);
  }

  protected visitForest(): void {
    this.gameState.ownedPugs.update((owned) => owned + 1);
  }
}
