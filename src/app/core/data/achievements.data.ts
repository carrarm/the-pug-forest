import { Achievement, GameState } from '@model';

function hasTier(state: GameState, tierCode: string, howMany: number): boolean {
  return (state.productionTiers[tierCode] ?? 0) >= howMany;
}

function hasPrestige(state: GameState, prestigeCode: string, howMany: number): boolean {
  return (state.prestiges[prestigeCode] ?? 0) >= howMany;
}

export const ACHIEVEMENTS: Achievement[] = [
  // Early game (0 to 50k pugs)
  {
    name: 'Paws on the Ground',
    description: 'Your adventure begins with one adorable pug',
    unlockText: 'Click your first pug',
    unlocked: (state: GameState) => state.ownedPugs > 0,
  },
  {
    name: 'Neighborhood Watch',
    description: 'The local children are starting to patrol the forest for pugs',
    unlockText: 'Own 5 Neighborhood Kids',
    unlocked: (state: GameState) => hasTier(state, 'NEIGHBORHOOD_KIDS', 5),
  },
  {
    name: 'Two Wheels, Many Pugs',
    description: "Now we're transporting pugs in style",
    unlockText: 'Buy your first Bike Cart',
    unlocked: (state: GameState) => hasTier(state, 'BIKE_CART', 1),
  },
  {
    name: 'A Whisper in the Leaves',
    description: 'Some people just have a gift for attracting pugs...',
    unlockText: 'Hire your first Pug Whisperer',
    unlocked: (state: GameState) => hasTier(state, 'PUG_WHISPERER', 1),
  },
  // Mid-game (50k to 5M pugs)
  {
    name: 'Rest Stop',
    description: 'Volunteers have taken up the noble pug-finding mission',
    unlockText: 'Build your first Forest Scout Hut',
    unlocked: (state: GameState) => hasTier(state, 'FOREST_SCOUT_HUT', 1),
  },
  {
    name: 'Wagon Wrangler',
    description: 'Your growing fleet roams the forest in search of fluff',
    unlockText: 'Own 3 Pug Rescue Wagons',
    unlocked: (state: GameState) => hasTier(state, 'PUG_RESCUE_WAGON', 1),
  },
  {
    name: 'Light in the Deep',
    description: 'Let the glow guide magical pugs to you',
    unlockText: 'Acquire the Enchanted Lantern',
    unlocked: (state: GameState) => hasTier(state, 'ENCHANTED_LANTERN', 1),
  },
  {
    name: 'Master of Multipliers',
    description: 'Your pug-collecting efficiency is beginning to soar',
    unlockText: 'Purchase any 3 upgrades',
    unlocked: (state: GameState) => {
      const totalOwned = (Object.values(state.upgradeTiers) as number[]).reduce(
        (total, nb) => total + nb,
        0,
      );
      return totalOwned >= 3;
    },
  },
  {
    name: 'One Million Snoots',
    description: 'A truly massive collection of tiny noses',
    unlockText: 'Earn 1,000,000 pugs total',
    unlocked: (state: GameState) => state.ownedPugs >= 1000000,
  },
  // Late-game (5M to billions)
  {
    name: 'Ranger Commander',
    description: 'Your forest operations are now fully coordinated',
    unlockText: 'Own 10 Forest Rangers Guild units',
    unlocked: (state: GameState) => hasTier(state, 'FOREST_RANGERS_GUILD', 10),
  },
  {
    name: 'Portal Pioneer',
    description: 'You’ve reached the magical regions of infinite pugdom',
    unlockText: 'Activate your first Portal to the Deep Forest',
    unlocked: (state: GameState) => hasTier(state, 'PORTAL_DEEP_FOREST', 1),
  },
  {
    name: 'Village Elder (of Pugs)',
    description: 'A peaceful community dedicated to pug prosperity',
    unlockText: 'Establish your first Pug Sanctuary Village',
    unlocked: (state: GameState) => hasTier(state, 'PUG_SANCTUARY', 1),
  },
  {
    name: 'Heartwood Awakening',
    description: 'An ancient force awakens to help gather pugs',
    unlockText: 'Grow the Elder Tree of Pugs',
    unlocked: (state: GameState) => hasTier(state, 'ELDER_TREE', 1),
  },
  {
    name: 'A Billion Barks',
    description: 'An astronomical collection of adorable companions',
    unlockText: 'Earn 1,000,000,000 pugs total',
    unlocked: (state: GameState) => state.ownedPugs >= 1000000000,
  },
  // Prestige
  {
    name: 'Essence Collector',
    description: 'Your journey begins anew—with greater wisdom',
    unlockText: 'Prestige for the first time (obtain 1 Pug Essence)',
    unlocked: (state: GameState) => hasPrestige(state, 'PUG_ESSENCE', 1),
  },
  {
    name: 'Ascended Sniffer',
    description: 'Your connection to the pug realm deepens',
    unlockText: 'Accumulate 10 total Pug Essences',
    unlocked: (state: GameState) => hasPrestige(state, 'PUG_ESSENCE', 10),
  },
  {
    name: 'Elder Pug Champion',
    description: 'A legendary presence blesses your forest trips',
    unlockText: 'Earn the Spirit of the Elder Pug prestige reward',
    unlocked: (state: GameState) => hasPrestige(state, 'SPIRIT_ELDER', 1),
  },
  {
    name: 'Roots of Infinity',
    description: 'The Elder Trees remember you through every cycle',
    unlockText: 'Reach Pug Realm Ascension prestige',
    unlocked: (state: GameState) => hasPrestige(state, 'PUG_REALM', 1),
  },
  {
    name: 'Cycle of Cuddles',
    description: 'You are eternally committed to collecting all the pugs',
    unlockText: 'Complete 5 total prestige resets',
    unlocked: (state: GameState) => {
      const totalOwned = (Object.values(state.prestiges) as number[]).reduce(
        (total, nb) => total + nb,
        0,
      );
      return totalOwned >= 5;
    },
  },
];
