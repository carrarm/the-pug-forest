import { Component, signal } from '@angular/core';
import { NgClass } from '@angular/common';

import { MainPanel } from '@components/main-panel/main-panel';
import { AchievementPanel } from '@components/achievement-panel/achievement-panel';
import { ProductionPanel } from '@components/production-panel/production-panel';
import { PanelType } from '@model';

import { Header } from '../header/header';
import { ContentPanel } from '@components/content-panel/content-panel';
import { FormsModule } from '@angular/forms';

type MenuGroup = 'PURCHASES' | 'ACHIEVEMENTS' | 'PRESTIGE' | 'SETTINGS';

@Component({
  selector: 'app-mobile-layout',
  imports: [ContentPanel, FormsModule, Header, MainPanel, NgClass],
  templateUrl: './mobile-layout.html',
  styleUrl: './mobile-layout.css',
})
export class MobileLayout {
  protected activeMenuGroup = signal<MenuGroup>('PURCHASES');
  protected activePanel = signal<PanelType>('PRODUCTION');
  protected menuPanelOpen = signal(false);

  protected changeActiveMenuGroup(group: MenuGroup): void {
    this.activeMenuGroup.set(group);
    switch (group) {
      case 'PURCHASES':
        this.activePanel.set('PRODUCTION');
        break;
      case 'ACHIEVEMENTS':
        this.activePanel.set('ACHIEVEMENTS');
        break;
      case 'PRESTIGE':
        this.activePanel.set('PRESTIGE');
        break;
      case 'SETTINGS':
        this.activePanel.set('SETTINGS');
        break;
      default:
        break;
    }
  }
}
