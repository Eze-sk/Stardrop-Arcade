import type { ITEMS_TYPE } from "../types/itemsType";

const ITEMS: ITEMS_TYPE[] = [
  {
    name: "1 Coin",
    probability: 0.3,
    spriteFrame: 0,
    effect: {
      upCoins: 1,
    }
  },
  {
    name: "5 Coin",
    probability: 0.2,
    spriteFrame: 1,
    effect: {
      upCoins: 5,
    }
  },
  {
    name: "1-up",
    probability: 0.4,
    spriteFrame: 8,
    effect: {
      upLife: 1
    }
  },
  {
    name: "coffee",
    probability: 0.9,
    spriteFrame: 6,
    effect: {
      upSpeed: 2,
      durationEffect: 16 * 1000
    }
  },
  {
    name: "Heavy Machine Gun",
    probability: 0.8,
    spriteFrame: 3,
    effect: {
      arms: "HeavyMachine",
      durationEffect: 12 * 1000
    }
  },
  {
    name: "Shotgun",
    probability: 0.7,
    spriteFrame: 7,
    effect: {
      arms: "shotgun",
      durationEffect: 12 * 1000
    }
  },
  {
    name: "Sheriff Badge",
    probability: 0.8,
    spriteFrame: 10,
    effect: {
      arms: "sheriffBadge",
      durationEffect: 24 * 1000
    }
  },
  {
    name: "Wagon Wheel",
    probability: 0.9,
    spriteFrame: 2,
    effect: {
      arms: "sheriffBadge",
      durationEffect: 12 * 1000
    }
  },
]

export default ITEMS