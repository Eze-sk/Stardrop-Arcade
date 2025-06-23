import Phaser from "phaser"
import SCENES from "../const/scenes"
import TEXTURE_KEYS from "../const/TextureKeys"

export default class Preload extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.PRELOAD })
  }

  preload() {
    this.load.spritesheet(TEXTURE_KEYS.PLAYER, "player-sprite-sheet.webp", {
      frameWidth: 17,
      frameHeight: 17,
    })

    this.load.spritesheet(TEXTURE_KEYS.BULLET, "bullets.webp", {
      frameWidth: 4,
      frameHeight: 4,
    })

    this.load.spritesheet(TEXTURE_KEYS.ITEMS, "items-sprite-sheet.webp", {
      frameWidth: 18,
      frameHeight: 18,
    })

    this.load.spritesheet(TEXTURE_KEYS.ENEMIES, "enemies-sprite-sheet.webp", {
      frameWidth: 17,
      frameHeight: 17,
    })

    this.load.spritesheet(TEXTURE_KEYS.UI, "ui-sprite-sheet.webp", {
      frameWidth: 22,
      frameHeight: 22,
    })

    this.load.spritesheet(TEXTURE_KEYS.BACKGROUND, "sprite-sheet-background.webp", {
      frameWidth: 256,
      frameHeight: 256,
    })

    this.load.spritesheet(TEXTURE_KEYS.BACKGROUND_ANIM, "sprite-sheet-background-anim.webp", {
      frameWidth: 256,
      frameHeight: 256,
    })
  }

  create() {
    this.scene.start(SCENES.GAME)
  }
}