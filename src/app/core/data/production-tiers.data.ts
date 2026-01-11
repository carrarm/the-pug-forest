import { ProductionTier } from '@model';

export const PRODUCTION_TIERS: ProductionTier[] = [
  {
    code: 'NEIGHBORHOOD_KIDS',
    name: 'Neighborhood Kids',
    description: 'A couple kids who wander the forest and return with pugs they find',
    baseCost: 15,
    production: 1,
    owned: 0,
  },
  {
    code: 'BIKE_CART',
    name: 'Bike Cart',
    description: "Attach a little cart to the kids' bikes so they can carry more pugs",
    baseCost: 200,
    production: 3,
    owned: 0,
  },
  {
    code: 'PUG_WHISPERER',
    name: 'Pug Whisperer',
    description: 'A gentle wanderer who charms pugs out from the bushes',
    baseCost: 1200,
    production: 8,
    owned: 0,
  },
  {
    code: 'FOREST_WAYSTONES',
    name: 'Forest Waystones',
    description: 'Enchanted markers that guide wandering pugs safely through the forest',
    baseCost: 5000,
    production: 20,
    owned: 0,
  },
  {
    code: 'FOREST_SCOUT_HUT',
    name: 'Forest Scout Hut',
    description: 'A small hut staffed by volunteers who track pug migration paths',
    baseCost: 15_000,
    production: 50,
    owned: 0,
  },
  {
    code: 'PUG_RESCUE_WAGON',
    name: 'Pug Rescue Wagon',
    description: 'A cozy wagon rolling through the forest collecting families of pugs',
    baseCost: 150_000,
    production: 200,
    owned: 0,
  },
  {
    code: 'ENCHANTED_LANTERN',
    name: 'Enchanted Lantern',
    description: 'This lantern attracts curious magical pugs from deeper woods',
    baseCost: 800_000,
    production: 1000,
    owned: 0,
  },
  {
    code: 'FOREST_RANGERS_GUILD',
    name: 'Forest Rangers Guild',
    description: 'Trained rangers who maintain pug-friendly trails around the forest',
    baseCost: 15_000_000,
    production: 5500,
    owned: 0,
  },
  {
    code: 'PORTAL_DEEP_FOREST',
    name: 'Portal to the Deep Forest',
    description: 'A shimmering portal that leads to ancient pug-havens',
    baseCost: 450_000_000,
    production: 30_000,
    owned: 0,
  },
  {
    code: 'DEEP_FOREST_OUTPOST',
    name: 'Deep Forest Outpost',
    description: 'A permanent base beyond the portal where pugs gather before returning home',
    baseCost: 1_800_000_000,
    production: 75_000,
    owned: 0,
  },
  {
    code: 'PUG_SANCTUARY',
    name: 'Pug Sanctuary Village',
    description: 'A tiny settlement run by magical creatures dedicated to pug gatherings',
    baseCost: 7_000_000_000,
    production: 150_000,
    owned: 0,
  },
  {
    code: 'ELDER_TREE',
    name: 'Elder Tree of Pugs',
    description: 'A colossal ancient tree radiating pure pug-attraction energy',
    baseCost: 120_000_000_000,
    production: 900_000,
    owned: 0,
  },
];

export const PRODUCTION_TIER_BY_CODE: Record<string, ProductionTier> = {};
PRODUCTION_TIERS.forEach((tier) => {
  PRODUCTION_TIER_BY_CODE[tier.code] = tier;
});
