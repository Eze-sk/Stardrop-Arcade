import Phaser from "phaser"
import TEXTURE_KEYS from "../const/TextureKeys"

export default class UI {
  private scene: Phaser.Scene


  private lifeContainer: Phaser.GameObjects.Container;
  private coinContainer: Phaser.GameObjects.Container;
  private uiContainer: Phaser.GameObjects.Container
  private inventoryContainer: Phaser.GameObjects.Container;

  private spriteItemInventory!: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene) {
    this.scene = scene

    // --- INVENTORY ---
    const inventorySprite = this.scene.add.sprite(0, 0, TEXTURE_KEYS.UI, 0).setScale(2.2)
    this.inventoryContainer = this.scene.add.container(20, 0, [inventorySprite])

    // --- LIFE ---
    const spriteLife = this.scene.add.sprite(0, 0, TEXTURE_KEYS.UI, 2).setScale(2)
    const textLife = this.scene.add.text(20, -7, "", {
      fontFamily: "Pixelify Sans",
      fontSize: '17px',
      color: '#ffffff',
    })

    this.lifeContainer = this.scene.add.container(0, 45, [spriteLife, textLife])

    // --- COINS ---
    const spriteCoin = this.scene.add.sprite(0, 0, TEXTURE_KEYS.UI, 3).setScale(2)
    const textCoin = this.scene.add.text(20, -7, "", {
      fontFamily: "Pixelify Sans",
      fontSize: '17px',
      color: '#ffffff',
    })

    this.coinContainer = this.scene.add.container(0, 76, [spriteCoin, textCoin])

    // --- UI CONTAINER ---
    this.uiContainer = this.scene.add.container(368, 72, [
      this.lifeContainer,
      this.coinContainer,
      this.inventoryContainer
    ])

    this.uiContainer.setDepth(999)
    this.uiContainer.setScrollFactor(0);
  }

  updateCoins(coins: number) {
    const text = this.coinContainer.getAt(1) as Phaser.GameObjects.Text
    text.setText(`x${coins.toString()}`)
  }

  updateLife(life: number) {
    const text = this.lifeContainer.getAt(1) as Phaser.GameObjects.Text
    text.setText(`x${life.toString()}`)
  }

  updateInventory(itemsFrame: number) {
    const inventorySprite = this.inventoryContainer.getAt(0) as Phaser.GameObjects.Sprite

    this.spriteItemInventory = this.scene.add.sprite(
      inventorySprite.x,
      inventorySprite.y,
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