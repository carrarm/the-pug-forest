import { ProductionTier } from '@model';

export const PRODUCTION_TIERS: ProductionTier[] = [
  {
    code: 'NEIGHBORHOOD_KIDS',
    name: 'Neighborhood Kids',
    description: 'A couple kids who wander the forest and return with pugs they find',
    baseCost: 10,
    production: 0.2,
    owned: 0,
  },
  {
    code: 'BIKE_CART',
    name: 'Bike Cart',
    description: "Attach a little cart to the kids' bikes so they can carry more pugs",
    baseCost: 300,
    production: 1,
    owned: 0,
  },
  {
    code: 'PUG_WHISPERER',
    name: 'Pug Whisperer',
    description: 'A gentle wanderer who charms pugs out from the bushes',
    baseCost: 3_000,
    production: 6,
    owned: 0,
  },
  {
    code: 'FOREST_WAYSTONES',
    name: 'Forest Waystones',
    description: 'Enchanted markers that guide wandering pugs safely through the forest',
    baseCost: 30_000,
    production: 40,
    owned: 0,
  },
  {
    code: 'FOREST_SCOUT_HUT',
    name: 'Forest Scout Hut',
    description: 'A small hut staffed by volunteers who track pug migration paths',
    baseCost: 500_000,
    production: 250,
    owned: 0,
  },
  {
    code: 'PUG_RESCUE_WAGON',
    name: 'Pug Rescue Wagon',
    description: 'A cozy wagon rolling through the forest collecting families of pugs',
    baseCost: 8_000_000,
    production: 1_500,
    owned: 0,
  },
  {
    code: 'ENCHANTED_LANTERN',
    name: 'Enchanted Lantern',
    description: 'This lantern attracts curious magical pugs from deeper woods',
    baseCost: 130_000_000,
    production: 9_000,
    owned: 0,
  },
  {
    code: 'FOREST_RANGERS_GUILD',
    name: 'Forest Rangers Guild',
    description: 'Trained rangers who maintain pug-friendly trails around the forest',
    baseCost: 2_000_000_000,
    production: 55_000,
    owned: 0,
  },
  {
    code: 'PORTAL_DEEP_FOREST',
    name: 'Portal to the Deep Forest',
    description: 'A shimmering portal that leads to ancient pug-havens',
    baseCost: 35_000_000_000,
    production: 350_000,
    owned: 0,
  },
  {
    code: 'DEEP_FOREST_OUTPOST',
    name: 'Deep Forest Outpost',
    description: 'A permanent base beyond the portal where pugs gather before returning home',
    baseCost: 600_000_000_000,
    production: 2_200_000,
    owned: 0,
  },
  {
    code: 'PUG_SANCTUARY',
    name: 'Pug Sanctuary Village',
    description: 'A tiny settlement run by magical creatures dedicated to pug gatherings',
    baseCost: 10_000_000_000_000,
    production: 14_000_000,
    owned: 0,
  },
  {
    code: 'ELDER_TREE',
    name: 'Elder Tree of Pugs',
    description: 'A colossal ancient tree radiating pure pug-attraction energy',
    baseCost: 170_000_000_000_000,
    production: 90_000_000,
    owned: 0,
  },
];

export const PRODUCTION_TIER_BY_CODE: Record<string, ProductionTier> = {};
PRODUCTION_TIERS.forEach((tier) => {
  PRODUCTION_TIER_BY_CODE[tier.code] = tier;
});
