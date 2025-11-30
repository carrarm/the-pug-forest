import { Component, input } from '@angular/core';
import { PanelType } from '@model';
import { ProductionPanel } from '@components/production-panel/production-panel';
import { AchievementPanel } from '@components/achievement-panel/achievement-panel';

@Component({
  selector: 'app-content-panel',
  imports: [AchievementPanel, ProductionPanel],
  templateUrl: './content-panel.html',
  styleUrl: './content-panel.css',
})
export class ContentPanel {
  public readonly activePanel = input.required<PanelType>();
}
