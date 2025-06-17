type arms = "HeavyMachine" | "shotgun" | "sheriffBadge" | "WagonWheel"

type affection = {
  upLife?: number,
  upSpeed?: number, // multiplier
  upCoins?: number,
  arms?: arms,
  durationEffect?: number,
}

export type ITEMS_TYPE = {
  name: string
  probability: number
  spriteFrame: number
  affection: affection
}
