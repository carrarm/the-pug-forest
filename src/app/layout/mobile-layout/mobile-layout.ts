import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

import { ContentPanel } from '@components/content-panel/content-panel';
import { MainPanel } from '@components/main-panel/main-panel';
import { PanelType } from '@model';

import { Header } from '../header/header';

type MenuGroup = 'PURCHASES' | 'ACHIEVEMENTS' | 'PRESTIGE' | 'SETTINGS' | 'STATS';

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
    if (group === 'PURCHASES') {
      this.activePanel.set('PRODUCTION');
    } else {
      this.activePanel.set(group);
    }
  }
}
