import ANIMATION_KEYS from "../../const/AnimationKeys"
import TEXTURE_KEYS from "../../const/TextureKeys"

export default function PlayerAnims(scene: Phaser.Scene) {
  scene.anims.create({
    key: ANIMATION_KEYS.PLAYER_WALK_UP,
    frames: scene.anims.generateFrameNumbers(TEXTURE_KEYS.PLAYER, { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  })

  scene.anims.create({
    key: ANIMATION_KEYS.PLAYER_WALK_RIGHT,
    frames: scene.anims.generateFrameNumbers(TEXTURE_KEYS.PLAYER, { start: 4, end: 7 }),
    frameRate: 10,
    repeat: -1
  })

  scene.anims.create({
    key: ANIMATION_KEYS.PLAYER_WALK_DOWN,
    frames: scene.anims.generateFrameNumbers(TEXTURE_KEYS.PLAYER, { start: 8, end: 11 }),
    frameRate: 10,
    repeat: -1
  })

  scene.anims.create({
    key: ANIMATION_KEYS.PLAYER_WALK_LEFT,
    frames: scene.anims.generateFrameNumbers(TEXTURE_KEYS.PLAYER, { start: 12, end: 15 }),
    frameRate: 10,
    repeat: -1
  })
}