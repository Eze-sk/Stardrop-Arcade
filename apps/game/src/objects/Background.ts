import Phaser from "phaser"
import TEXTURE_KEYS from "../const/TextureKeys"

// two sprite for background, one for animation and one for static

export default class Background extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, TEXTURE_KEYS.BACKGROUND)
    scene.add.existing(this)

  }
}