import Phaser from "phaser"
import TEXTURE_KEYS from "../const/TextureKeys"

export default class UI {
  private scene: Phaser.Scene

  private spriteInventory!: Phaser.GameObjects.Sprite
  private spriteItemInventory!: Phaser.GameObjects.Sprite
  private spriteCoin!: Phaser.GameObjects.Sprite
  private textCoin!: Phaser.GameObjects.Text
  private spriteLife!: Phaser.GameObjects.Sprite
  private textLife!: Phaser.GameObjects.Text

  constructor(scene: Phaser.Scene) {
    this.scene = scene

    this.spriteInventory = this.scene.add.sprite(320, 50, TEXTURE_KEYS.UI, 0)
    this.spriteLife = this.scene.add.sprite(300, 100, TEXTURE_KEYS.UI, 2)
    this.spriteCoin = this.scene.add.sprite(300, 140, TEXTURE_KEYS.UI, 3)

    this.spriteInventory.setScale(2)
    this.spriteCoin.setScale(2)
    this.spriteLife.setScale(2)

    this.textCoin = this.scene.add.text(320, 133, "", {
      fontSize: '17px',
      color: '#ffffff'
    })

    this.textLife = this.scene.add.text(320, 93, "", {
      fontSize: '17px',
      color: '#ffffff'
    })
  }

  updateCoins(coins: number) {
    this.textCoin.setText(`x${coins.toString()}`)
  }

  updateLife(life: number) {
    this.textLife.setText(`x${life.toString()}`)
  }

  updateInventory(itemsFrame: number) {
    this.spriteItemInventory = this.scene.add.sprite(
      this.spriteInventory.x,
      this.spriteInventory.y,
      TEXTURE_KEYS.ITEMS,
      itemsFrame
    )

    this.spriteItemInventory.setOrigin(0.5, 0.5)
    this.spriteItemInventory.setScale(2)
  }

  clearInventory() {
    this.spriteItemInventory.destroy()
  }
}