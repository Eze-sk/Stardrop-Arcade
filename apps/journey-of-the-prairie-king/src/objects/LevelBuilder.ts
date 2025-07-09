import Phaser from "phaser"
import TEXTURE_KEYS from "../const/TextureKeys"

export default class LevelBuilder extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, TEXTURE_KEYS.BACKGROUND)
    scene.add.existing(this)
  }
}