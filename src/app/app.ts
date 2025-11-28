import { Component, inject, OnInit, signal } from '@angular/core';

import { PRODUCTION_TIERS } from '@data/production-tiers.data';
import { ShortNumberPipe } from '@core/pipes/short-number-pipe';
import { GameStateService } from '@core/services/game-state.service';
import { ProductionTier } from '@model';

import { PurchaseCard } from './components/purchase-card/purchase-card';
import { NgClass } from '@angular/common';
import { TierService } from '@core/services/tier.service';

type Panel = 'PRODUCTION' | 'UPGRADE' | 'PRESTIGE';

@Component({
  selector: 'app-root',
  imports: [NgClass, PurchaseCard, ShortNumberPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly productionTiers = PRODUCTION_TIERS;

  protected readonly gameState = inject(GameStateService);

  private readonly tierService = inject(TierService);

  protected activePanel = signal<Panel>('PRODUCTION');

  public ngOnInit() {
    setInterval(() => {
      this.gameState.ownedPugs.update((owned) => owned + this.gameState.pugsPerSecond());
      this.gameState.saveState();
    }, 1000);
  }

  protected purchaseProductionTier(tier: ProductionTier, amount: number): void {
    const owned = this.gameState.productionTiers()[tier.code];
    this.gameState.productionTiers.update((tiers) => {
      return { ...tiers, [tier.code]: (tiers[tier.code] ?? 0) + amount };
    });
    const totalPurchaseCost = this.tierService.computeCurrentCost(tier.baseCost, owned) * amount;
    this.gameState.ownedPugs.update((owned) => owned - totalPurchaseCost);
    this.gameState.totalSpent.update((total) => total + totalPurchaseCost);
  }

  protected visitForest(): void {
    this.gameState.ownedPugs.update((owned) => owned + 1);
  }
}
