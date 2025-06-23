import Phaser from "phaser"
import ANIMATION_KEYS from "../../const/AnimationKeys"
import TEXTURE_KEYS from "../../const/TextureKeys"

export default function EnemyAnims(scene: Phaser.Scene) {
  scene.anims.create({
    key: ANIMATION_KEYS.ENEMY_WALK,
    frames: scene.anims.generateFrameNumbers(TEXTURE_KEYS.ENEMIES, {
      start: 0,
      end: 1,
    }),
    frameRate: 8,
    repeat: -1,
  })
}