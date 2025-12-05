import { Component, inject } from '@angular/core';

import { UpgradeTierCard } from '@components/upgrade-panel/upgrade-tier-card/upgrade-tier-card';
import { GameStateService } from '@core/services/game-state.service';
import { UPGRADE_TIERS } from '@data/upgrade-tiers.data';
import { UpgradeTier } from '@model';
import { TierService } from '@core/services/tier.service';

@Component({
  selector: 'app-upgrade-panel',
  imports: [UpgradeTierCard],
  templateUrl: './upgrade-panel.html',
  styleUrl: './upgrade-panel.css',
})
export class UpgradePanel {
  protected readonly upgradeTiers = UPGRADE_TIERS;

  protected readonly gameState = inject(GameStateService);
  protected readonly tierService = inject(TierService);

  protected purchaseUpgradeTier(tier: UpgradeTier): void {
    this.gameState.upgradeTiers.update((tiers) => {
      return { ...tiers, [tier.code]: (tiers[tier.code] ?? 0) + 1 };
    });
    this.gameState.ownedPugs.update(
      (owned) =>
        owned -
        this.tierService.computeCurrentCost(
          tier.baseCost,
          this.gameState.upgradeTiers()[tier.code] ?? 0,
        ),
    );
  }
}
