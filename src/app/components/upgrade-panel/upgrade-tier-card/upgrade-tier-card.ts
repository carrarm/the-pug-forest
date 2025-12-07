import { Component, computed, inject, input, output } from '@angular/core';

import { PurchaseCard } from '@components/purchase-card/purchase-card';
import { GameStateService } from '@core/services/game-state.service';
import { TierService } from '@core/services/tier.service';
import { UpgradeTier } from '@model';
import { UPGRADE_TIER_BY_CODE } from '@data/upgrade-tiers.data';

@Component({
  selector: 'app-upgrade-tier-card',
  imports: [PurchaseCard],
  templateUrl: './upgrade-tier-card.html',
  styleUrl: './upgrade-tier-card.css',
})
export class UpgradeTierCard {
  public readonly tier = input.required<UpgradeTier>();
  public readonly owned = input.required<number>();
  public readonly multiplier = input.required<number>();
  public readonly purchase = output<void>();

  protected readonly gameState = inject(GameStateService);

  private readonly tierService = inject(TierService);
  protected readonly image = computed(() => `upgrade-tiers/${this.tier().code}.png`);
  protected readonly levelTier = computed(() => {
    const tier = { ...this.tier() };
    tier.description = UPGRADE_TIER_BY_CODE[this.tier().code].levelDescription[this.owned()];
    return tier;
  });
  protected readonly totalEffect = computed(() => this.tier().multiplier * this.owned());

  protected readonly cost = computed(() =>
    this.tierService.computeCost(this.multiplier(), this.tier().baseCost, this.owned()),
  );
}
