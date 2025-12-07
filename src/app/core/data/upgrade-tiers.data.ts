import { UpgradeTier } from '@model';

export const UPGRADE_TIERS: UpgradeTier[] = [
  {
    code: 'TRAVELER_AURA',
    name: 'Traveler’s Aura',
    description:
      'A warm shimmer surrounds you as your bond with the forest deepens. The pugs trust you more, approach faster, and cling onto your cloak like fluffy magnets',
    effect: 'Click value x2',
    affects: '',
    baseCost: 250,
    multiplier: 2,
    owned: 0,
  },
  {
    code: 'BARK_RESONANCE',
    name: 'Bark of Resonance',
    description:
      'The kids synchronize their calls, creating a harmonious ‘Here, pug-pug-pug!’ that carries farther across the forest',
    effect: 'Neighborhood Kids x2',
    affects: 'NEIGHBORHOOD_KIDS',
    baseCost: 900,
    multiplier: 2,
    owned: 0,
  },
  {
    code: 'GRIP_GATHERERS',
    name: 'Grip of Gatherers',
    description:
      'The kids fortify their handlebars with grippy vines, letting them haul more pudgy passengers without wobbling',
    effect: 'Bike Cart production x2',
    affects: 'BIKE_CART',
    baseCost: 900,
    multiplier: 2,
    owned: 0,
  },
  {
    code: 'WHISPERER_CHARM',
    name: "Whisperer's Charm",
    description:
      'With a soft hum and a gentle gesture, the whisperer channels a soothing aura that calms even the most skittish forest pug',
    effect: 'Pug Whisperer x2',
    affects: 'PUG_WHISPERER',
    baseCost: 2000,
    multiplier: 2,
    owned: 0,
  },
  {
    code: 'LANTERN_GLOW',
    name: 'Lantern Glow Enhancement',
    description:
      "The lantern's glow intensifies, guiding wandering pugs through even the thickest underbrush with comforting warmth",
    effect: 'Enchanted Lantern x2',
    affects: 'ENCHANTED_LANTERN',
    baseCost: 30000,
    multiplier: 2,
    owned: 0,
  },
  {
    code: 'GUILD_MASTER_TRAINING',
    name: 'Guild Master Training',
    description:
      'Veteran rangers provide advanced techniques: better tracking, quieter steps, and impeccable pug-spotting precision',
    effect: 'Forest Rangers Guild x2',
    affects: 'FOREST_RANGERS_GUILD',
    baseCost: 300000,
    multiplier: 2,
    owned: 0,
  },
  {
    code: 'PORTAL_STABILIZER',
    name: 'Portal Stabilizer',
    description:
      "Arcanists reinforce the portal's structure, keeping the swirling energies steady and widening the path for pug-kind to pass through",
    effect: 'Portal to the Deep Forest x2',
    affects: 'PORTAL_DEEP_FOREST',
    baseCost: 4000000,
    multiplier: 2,
    owned: 0,
  },
];

export const UPGRADE_TIER_BY_CODE: Record<string, UpgradeTier> = {};
UPGRADE_TIERS.forEach((tier) => {
  UPGRADE_TIER_BY_CODE[tier.code] = tier;
});
