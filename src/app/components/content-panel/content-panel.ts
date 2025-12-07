import { Component, input } from '@angular/core';

import { ProductionPanel } from '@components/production-panel/production-panel';
import { AchievementPanel } from '@components/achievement-panel/achievement-panel';
import { StatsPanel } from '@components/stats-panel/stats-panel';
import { PanelType } from '@model';
import { UpgradePanel } from '@components/upgrade-panel/upgrade-panel';

@Component({
  selector: 'app-content-panel',
  imports: [AchievementPanel, ProductionPanel, StatsPanel, UpgradePanel],
  templateUrl: './content-panel.html',
  styleUrl: './content-panel.css',
})
export class ContentPanel {
  public readonly activePanel = input.required<PanelType>();
}
