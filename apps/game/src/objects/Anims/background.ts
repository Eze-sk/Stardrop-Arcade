import ANIMATION_KEYS from "../../const/AnimationKeys";
import TEXTURE_KEYS from "../../const/TextureKeys";

export default function backgroundAnim(scene: Phaser.Scene) {
  scene.anims.create({
    key: ANIMATION_KEYS.BACKGROUND_ANIM,
    frames: scene.anims.generateFrameNumbers(TEXTURE_KEYS.BACKGROUND_ANIM, {
      start: 0,
      end: 1,
    }),
    frameRate: 12,
    repeat: -1,
  })
}