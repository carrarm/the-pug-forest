import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgTemplateOutlet } from '@angular/common';

import { ContentPanel } from '@components/content-panel/content-panel';
import { MainPanel } from '@components/main-panel/main-panel';
import { PanelType } from '@model';

import { Header } from '../header/header';

type View = 'MAIN' | 'PURCHASES' | 'PRESTIGE' | 'SETTINGS' | 'STATS';

@Component({
  selector: 'app-mobile-layout',
  imports: [ContentPanel, FormsModule, Header, MainPanel, NgClass, NgTemplateOutlet],
  templateUrl: './mobile-layout.html',
  styleUrl: './mobile-layout.css',
})
export class MobileLayout {
  protected activeViewGroup = signal<View>('PURCHASES');
  protected activePanel = signal<PanelType>('PRODUCTION');

  protected readonly menuButtons = [
    { icon: 'icons/MENU_PUGS.png', alt: 'Pugs menu', label: 'Pugs', view: 'MAIN' },
    {
      icon: 'icons/MENU_PURCHASES.png',
      alt: 'Purchases menu',
      label: 'Purchases',
      view: 'PURCHASES',
    },
    { icon: 'icons/MENU_PRESTIGE.png', alt: 'Prestige menu', label: 'Prestige', view: 'PRESTIGE' },
    { icon: 'icons/MENU_STATS.png', alt: 'Stats menu', label: 'Stats', view: 'STATS' },
    { icon: 'icons/MENU_SETTINGS.png', alt: 'Settings menu', label: 'Settings', view: 'SETTINGS' },
  ] as const;

  protected changeActiveView(view: View): void {
    this.activeViewGroup.set(view);
    if (view === 'PURCHASES') {
      this.activePanel.set('PRODUCTION');
    } else {
      this.activePanel.set(view);
    }
  }
}
