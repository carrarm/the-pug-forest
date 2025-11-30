import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';

import { ContentPanel } from '@components/content-panel/content-panel';
import { MainPanel } from '@components/main-panel/main-panel';
import { PanelType } from '@model';

import { Header } from '../header/header';

@Component({
  selector: 'app-desktop-layout',
  imports: [ContentPanel, Header, MainPanel, NgClass],
  templateUrl: './desktop-layout.html',
  styleUrl: './desktop-layout.css',
})
export class DesktopLayout {
  protected activePanel = signal<PanelType>('PRODUCTION');
}
