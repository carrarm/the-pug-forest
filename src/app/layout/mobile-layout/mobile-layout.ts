import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';

import { ContentPanel } from '@components/content-panel/content-panel';
import { MainPanel } from '@components/main-panel/main-panel';
import { PugCounterPanel } from '@components/pug-counter-panel/pug-counter-panel';
import { PanelType } from '@model';

import { Header } from '../header/header';

type View = 'MAIN' | 'PURCHASES' | 'PRESTIGE' | 'SETTINGS' | 'STATS';

@Component({
  selector: 'app-mobile-layout',
  imports: [ContentPanel, FormsModule, Header, MainPanel, NgTemplateOutlet, PugCounterPanel],
  templateUrl: './mobile-layout.html',
  styleUrl: './mobile-layout.css',
})
export class MobileLayout {
  protected activeViewGroup = signal<View>('MAIN');
  protected activePanel = signal<PanelType>('MAIN');

  protected readonly showPanelTitle = computed(() =>
    ['PRESTIGE', 'SETTINGS'].includes(this.activeViewGroup()),
  );

  protected readonly menuButtons = [
    { icon: 'icons/MENU_PUGS.svg', alt: 'Pugs menu', label: 'Pugs', view: 'MAIN' },
    {
      icon: 'icons/MENU_PURCHASES.svg',
      alt: 'Purchases menu',
      label: 'Purchases',
      view: 'PURCHASES',
    },
    { icon: 'icons/MENU_PRESTIGE.svg', alt: 'Prestige menu', label: 'Prestige', view: 'PRESTIGE' },
    { icon: 'icons/MENU_STATS.svg', alt: 'Stats menu', label: 'Stats', view: 'STATS' },
    { icon: 'icons/MENU_SETTINGS.svg', alt: 'Settings menu', label: 'Settings', view: 'SETTINGS' },
  ] as const;

  protected changeActiveView(view: View): void {
    this.activeViewGroup.set(view);
    switch (view) {
      case 'PURCHASES':
        this.activePanel.set('PRODUCTION');
        break;
      case 'STATS':
        this.activePanel.set('ACHIEVEMENTS');
        break;
      default:
        this.activePanel.set(view);
    }
  }
}
