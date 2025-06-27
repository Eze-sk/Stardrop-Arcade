import type { ITEMS_TYPE } from "../types/itemsType";

const ITEMS: ITEMS_TYPE[] = [
  {
    name: "1 Coin",
    probability: 0.8,
    spriteFrame: 0,
    effect: {
      upCoins: 1,
    }
  },
  {
    name: "5 Coin",
    probability: 0.4,
    spriteFrame: 1,
    effect: {
      upCoins: 5,
    }
  },
  {
    name: "1-up",
    probability: 0.1,
    spriteFrame: 8,
    effect: {
      upLife: 1
    }
  },
  {
    name: "coffee",
    probability: 0.08,
    spriteFrame: 6,
    effect: {
      upSpeed: 2,
      durationEffect: 16 * 1000
    }
  },
  {
    name: "Heavy Machine Gun",
    probability: 0.07,
    spriteFrame: 3,
    effect: {
      weapon: "heavyMachine",
      fireRate: 100,
      durationEffect: 12 * 1000
    }
  },
  {
    name: "Shotgun",
    probability: 0.07,
    spriteFrame: 7,
    effect: {
      weapon: "shotgun",
      durationEffect: 12 * 1000
    }
  },
  {
    name: "Smoke Bomb",
    probability: 0.05,
    spriteFrame: 9,
    effect: {
      // TODO: define effect for Smoke Bomb
    }
  },
  {
    name: "Screen Nuke",
    probability: 0.03,
    spriteFrame: 4,
    effect: {
      // TODO: define effect for Screen Nuke
    }
  },
  {
    name: "Wagon Wheel",
    probability: 0.02,
    spriteFrame: 2,
    effect: {
      weapon: "sheriffBadge",
      durationEffect: 12 * 1000
    }
  },
  {
    name: "Sheriff Badge",
    probability: 0.015,
    spriteFrame: 10,
    effect: {
      weapon: "sheriffBadge",
      durationEffect: 24 * 1000
    }
  },
  {
    name: "Tombstone",
    probability: 0.01,
    spriteFrame: 5,
    effect: {
      // TODO: define effect for Tombstone
    }
  },
]

export default ITEMS