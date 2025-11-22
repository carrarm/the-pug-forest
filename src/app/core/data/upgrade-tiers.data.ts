import { UpgradeTier } from '@model';

export const UPGRADE_TIERS: UpgradeTier[] = [
  {
    code: 'BARK_RESONANCE',
    name: 'Bark of Resonance',
    description: 'Neighborhood Kids + Bike Cart production x2',
    affects: ['NEIGHBORHOOD_KIDS', 'BIKE_CART'],
    baseCost: 250,
    multiplier: 2,
  },
  {
    code: 'WHISPERER_CHARM',
    name: "Whisperer's Charm",
    description: 'Pug Whisperer x2',
    affects: ['PUG_WHISPERER'],
    baseCost: 2000,
    multiplier: 2,
  },
  {
    code: 'LANTERN_GLOW',
    name: 'Lantern Glow Enhancement',
    description: 'Enchanted Lantern x2',
    affects: ['ENCHANTED_LANTERN'],
    baseCost: 30000,
    multiplier: 2,
  },
  {
    code: 'GUILD_MASTER_TRAINING',
    name: 'Guild Master Training',
    description: 'Forest Rangers Guild x2',
    affects: ['FOREST_RANGERS_GUILD'],
    baseCost: 300000,
    multiplier: 2,
  },
  {
    code: 'PORTAL_STABILIZER',
    name: 'Portal Stabilizer',
    description: 'Portal to the Deep Forest x2',
    affects: ['PORTAL_DEEP_FOREST'],
    baseCost: 4000000,
    multiplier: 2,
  },
];
