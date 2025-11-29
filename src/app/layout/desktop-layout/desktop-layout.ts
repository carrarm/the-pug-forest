import { NgClass } from '@angular/common';
import { Component, inject, output, signal } from '@angular/core';

import { GameStateService } from '@core/services/game-state.service';
import { ProductionPanel } from '@components/production-panel/production-panel';
import { AchievementPanel } from '@components/achievement-panel/achievement-panel';
import { MainPanel } from '@components/main-panel/main-panel';

import { Header } from '../header/header';

type Panel = 'PRODUCTION' | 'UPGRADE' | 'PRESTIGE';

@Component({
  selector: 'app-desktop-layout',
  imports: [AchievementPanel, Header, MainPanel, NgClass, ProductionPanel],
  templateUrl: './desktop-layout.html',
  styleUrl: './desktop-layout.css',
})
export class DesktopLayout {
  protected readonly gameState = inject(GameStateService);

  protected activePanel = signal<Panel>('PRODUCTION');
}
