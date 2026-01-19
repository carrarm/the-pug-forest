import { TestBed } from '@angular/core/testing';

import { GameStateService } from '@core/services/game-state';
import { PRODUCTION_TIERS } from '@data/production-tiers.data';
import { UPGRADE_TIERS } from '@data/upgrade-tiers.data';
import { ProductionTier } from '@model';

import { TierService } from './tier';

function configureTier(
  mock: GameStateService,
  tier: ProductionTier,
  ownedProduction: number,
  ownedUpgrades: number,
): void {
  tier.owned = ownedProduction;
  mock.productionTiers.update((tiers) => ({ ...tiers, [tier.code]: ownedProduction }));

  const upgradeTier = UPGRADE_TIERS.find((u) => u.affects === tier.code)!;
  upgradeTier.owned = ownedUpgrades;
  mock.upgradeTiers.update((tiers) => ({ ...tiers, [upgradeTier.code]: ownedUpgrades }));
}

describe.shuffle('TierService', () => {
  let service: TierService;

  let gameStateMock: GameStateService;

  beforeEach(() => {
    gameStateMock = new GameStateService();
    TestBed.configureTestingModule({
      providers: [{ provide: GameStateService, useValue: gameStateMock }],
    });
    service = TestBed.inject(TierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should use the base production if there are no upgrades', () => {
    const testedTier = PRODUCTION_TIERS[0];
    configureTier(gameStateMock, testedTier, 10, 0);

    const baseProduction = service.computeBaseProduction(testedTier.code);
    expect(baseProduction).toBe(testedTier.production);
  });

  it('should apply upgrades to base production', () => {
    const upgradeMultiplier = 2;
    const testedTier = PRODUCTION_TIERS[0];
    const ownedUpgrades = 10;
    configureTier(gameStateMock, testedTier, 10, ownedUpgrades);

    const baseProduction = service.computeBaseProduction(testedTier.code);
    expect(baseProduction).toBe(testedTier.production * Math.pow(upgradeMultiplier, ownedUpgrades));
  });

  it('should apply penalty to offline gains', () => {
    gameStateMock.offlineGainPercent.set(60);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    gameStateMock.lastProductionDate.set(yesterday.getTime());

    const testedTiers = [PRODUCTION_TIERS[0], PRODUCTION_TIERS[1]];
    testedTiers.forEach((tier) => {
      configureTier(gameStateMock, tier, 10, 0);
    });

    const elapsedSeconds = 24 * 60 * 60;
    const tierProduction = service.productionPerSecond();

    const offlineGains = Math.round(service.computeOfflineProduction());
    const expectedGains = Math.round(elapsedSeconds * tierProduction * 0.6);
    expect(offlineGains).toBe(expectedGains);
  });

  it('should use all tiers to compute production per second', () => {
    const testedTiers = [PRODUCTION_TIERS[0], PRODUCTION_TIERS[1]];
    testedTiers.forEach((tier) => {
      configureTier(gameStateMock, tier, 10, 0);
    });

    const tierProduction = testedTiers.reduce(
      (total, tier) => total + service.computeBaseProduction(tier.code) * tier.owned,
      0,
    );

    const productionPerSecond = service.productionPerSecond();
    expect(productionPerSecond).toBe(tierProduction);
  });
});
