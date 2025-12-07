export interface GameState {
  ownedPugs: number;
  lastProductionDate: number;
  productionTiers: Record<string, ProductionTier>;
  upgradeTiers: Record<string, UpgradeTier>;
  prestiges: Record<string, number | undefined>;
  achievements: Record<string, boolean>;
  offlineGainPercent: number;
  statistics: Statistics;
}

export interface Statistics {
  totalPugs: number;
  totalClicks: number;
  totalSpent: number;
  totalPrestiges: number;
  firstClickDate: number;
}

export interface Tier {
  code: string;
  name: string;
  description: string;
  baseCost: number;
  owned: number;
}

export interface ProductionTier extends Tier {
  production: number;
}

export interface UpgradeTier extends Tier {
  effect: string;
  affects: string;
  multiplier: number;
  levelDescription: string[];
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

export type PanelType =
  | 'MAIN'
  | 'PRODUCTION'
  | 'UPGRADE'
  | 'PRESTIGE'
  | 'ACHIEVEMENTS'
  | 'SETTINGS'
  | 'STATS';

export type Device = 'MOBILE' | 'DESKTOP';
