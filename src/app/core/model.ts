export interface GameState {
  ownedPugs: number;
  totalSpent: number;
  lastProductionDate: number;
  productionTiers: Record<string, number>;
  upgradeTiers: Record<string, number>;
  prestiges: Record<string, number>;
  achievements: Record<string, boolean>;
}

export interface ProductionTier {
  code: string;
  name: string;
  description: string;
  baseCost: number;
  production: number;
}

export interface UpgradeTier {
  code: string;
  name: string;
  description: string;
  affects: string[];
  baseCost: number;
  multiplier: number;
}

export interface Prestige {
  code: string;
  name: string;
  description: string;
  cost: number;
}

export interface Achievement {
  name: string;
  description: string;
  unlockText: string;
  unlocked: (state: GameState) => boolean;
}
