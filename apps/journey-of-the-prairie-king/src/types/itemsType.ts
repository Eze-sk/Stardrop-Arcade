type Weapon = "heavyMachine" | "shotgun" | "sheriffBadge" | "wagonWheel"

export type Effect = {
  upLife?: number,
  upSpeed?: number,
  upCoins?: number,
  fireRate?: number,
  weapon?: Weapon,
  tombstone?: boolean,
  smokeBomb?: boolean,
  durationEffect?: number,
}

export type ITEMS_TYPE = {
  name: string
  probability: number
  spriteFrame: number
  effect: Effect
}
