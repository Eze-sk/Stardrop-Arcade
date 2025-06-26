import Phaser from "phaser"
import ANIMATION_KEYS from "../const/AnimationKeys";
import ITEMS from "../const/Items";
import TEXTURE_KEYS from "../const/TextureKeys";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  private speed = 100

  public life = 1

  public track!: Phaser.GameObjects.Sprite

  private droppedItemsGroup!: Phaser.Physics.Arcade.Group

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    droppedItemsGroup: Phaser.Physics.Arcade.Group
  ) {
    super(scene, x, y, texture);

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.droppedItemsGroup = droppedItemsGroup

    this.setScale(2)
  }

  takeDamage(damage: number) {
    this.life -= damage

    if (this.life <= 0) {
      this.dropItem(this.x, this.y)
      this.destroy()
    }
  }

  private dropItem(x: number, y: number) {
    for (const itemData of ITEMS) {
      if (Phaser.Math.FloatBetween(0, 1) <= itemData.probability) {
        const item = this.scene.add.sprite(x, y, TEXTURE_KEYS.ITEMS, itemData.spriteFrame)

        if (!item) return

        item.setScale(2)
        item.setActive(true)
        item.setVisible(true)
        item.setData("itemData", itemData);

        this.droppedItemsGroup.add(item)

        return item
      }
    }
  }

  update() {
    if (!this || !this.body) return

    const dx = this.track.x - this.x;
    const dy = this.track.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance === 0) return

    const velocityY = (dy / distance) * this.speed
    const velocityX = (dx / distance) * this.speed

    this.setVelocity(velocityX, velocityY)

    this.anims.play(ANIMATION_KEYS.ENEMY_WALK, true)
  }
}