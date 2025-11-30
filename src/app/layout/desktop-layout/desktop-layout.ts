import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ContentPanel } from '@components/content-panel/content-panel';
import { MainPanel } from '@components/main-panel/main-panel';
import { PanelType } from '@model';

import { Header } from '../header/header';

@Component({
  selector: 'app-desktop-layout',
  imports: [ContentPanel, FormsModule, Header, MainPanel, NgClass],
  templateUrl: './desktop-layout.html',
  styleUrl: './desktop-layout.css',
})
export class DesktopLayout {
  protected activePanel = signal<PanelType>('ACHIEVEMENTS');
  protected activePurchasePanel = signal<PanelType>('PRODUCTION');
}
