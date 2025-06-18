import type { ITEMS_TYPE } from "../types/itemsType";

const ITEMS: ITEMS_TYPE[] = [
  {
    name: "1 Coin",
    probability: 0.65,
    spriteFrame: 0,
    affection: {
      upCoins: 1,
    }
  },
  {
    name: "5 Coin",
    probability: 0.5,
    spriteFrame: 1,
    affection: {
      upCoins: 5,
    }
  },
  {
    name: "1-up",
    probability: 0.4,
    spriteFrame: 8,
    affection: {
      upLife: 1
    }
  },
  {
    name: "coffee",
    probability: 0.5,
    spriteFrame: 6,
    affection: {
      upSpeed: 2,
      durationEffect: 16 * 1000
    }
  },
  {
    name: "Heavy Machine Gun",
    probability: 0.2,
    spriteFrame: 3,
    affection: {
      arms: "HeavyMachine",
      durationEffect: 12 * 1000
    }
  },
  {
    name: "Shotgun",
    probability: 0.3,
    spriteFrame: 7,
    affection: {
      arms: "shotgun",
      durationEffect: 12 * 1000
    }
  },
  {
    name: "Sheriff Badge",
    probability: 0.2,
    spriteFrame: 10,
    affection: {
      arms: "sheriffBadge",
      durationEffect: 24 * 1000
    }
  },
  {
    name: "Wagon Wheel",
    probability: 0.1,
    spriteFrame: 2,
    affection: {
      arms: "sheriffBadge",
      durationEffect: 12 * 1000
    }
  },
]

export default ITEMS