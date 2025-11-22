import { Prestige } from '@model';

export const PRESTIGES: Prestige[] = [
  {
    code: 'PUG_ESSENCE',
    name: 'Pug Essence',
    description: 'Reset all pugs but gain: +5% global production per essence',
    cost: 1000000000,
  },
  {
    code: 'SPIRIT_ELDER',
    name: 'Spirit of the Elder Pug',
    description: 'Reset again, but: +25% global production',
    cost: 10000000000,
  },
  {
    code: 'PUG_REALM',
    name: 'Pug Realm Ascension',
    description: 'Reset again, but: +1 free Elder Tree every run',
    cost: 100000000000,
  },
];
