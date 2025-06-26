import Phaser from "phaser"
import ANIMATION_KEYS from "../const/AnimationKeys";
import TEXTURE_KEYS from "../const/TextureKeys";
import type { Effect, ITEMS_TYPE } from "../types/itemsType";
import UI from "./UI";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  private KeysMove!: Phaser.Types.Input.Keyboard.CursorKeys
  private Keyshoot!: Phaser.Types.Input.Keyboard.CursorKeys
  private lastShotTime: number = 0
  private shotCooldown: number = 400

  private inventory: ITEMS_TYPE[] = []

  public speed = 100
  public damage = 1

  public coins = 0
  public lifes = 3

  public bullets!: Phaser.Physics.Arcade.Group

  private updateUI!: UI

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    this.updateUI = new UI(scene)

    this.updateUI.updateCoins(this.coins)
    this.updateUI.updateLife(this.lifes)

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setScale(2)
    this.setDepth(1)

    if (scene.input.keyboard) {
      this.KeysMove = scene.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D
      }) as typeof this.KeysMove

      this.Keyshoot = scene.input.keyboard.createCursorKeys()

      scene.input.keyboard.on('keydown-SPACE', () => {
        this.activateItem();
      });
    }

    this.bullets = scene.physics.add.group({
      classType: Phaser.Physics.Arcade.Sprite,
      runChildUpdate: true,
      maxSize: 50
    })
  }

  private durationEffect(time: number, effect: () => void) {
    this.scene.time.delayedCall(time, effect)
  }

  private clearInventory() {
    this.inventory = []
    this.updateUI.clearInventory()
  }

  private itemCoffee(duration: number, effect: number) {
    this.speed *= effect

    console.log(this.speed)

    this.durationEffect(duration, () => {
      this.speed /= effect
      console.log(this.speed)
    })
  }

  private activateItem() {
    if (this.inventory.length === 0) return

    const item = this.inventory.shift() as ITEMS_TYPE

    if (item.effect.upSpeed) {
      this.itemCoffee(item.effect.durationEffect ?? 1000, item.effect.upSpeed)
    }

    this.clearInventory()
  }

  public collectItem(item: ITEMS_TYPE) {
    const effect = item.effect

    if (this.inventory.length > 1) {
      this.activateItem()
    }

    // estos son items que no entran en el inventario
    if (effect?.upCoins) {
      this.coins += effect.upCoins
      this.updateUI.updateCoins(this.coins)
    } else if (effect?.upLife) {
      this.lifes += effect.upLife;
      this.updateUI.updateLife(this.lifes)
    } else {
      // estos son items que entran en el inventario
      this.inventory.push(item)
      this.updateUI.updateInventory(item.spriteFrame)
    }
  }

  private drawBullet(dir: Phaser.Math.Vector2) {
    const bullet = this.bullets.get(this.x, this.y, TEXTURE_KEYS.BULLET) as Phaser.Physics.Arcade.Sprite;

    if (!bullet) return;

    const body = bullet.body as Phaser.Physics.Arcade.Body;

    bullet.setActive(true);
    bullet.setVisible(true);
    body.enable = true;

    dir = dir.normalize();
    bullet.setVelocity(dir.x * 200, dir.y * 200);

    bullet.setCollideWorldBounds(false);
    body.setAllowGravity(false);

    this.scene.time.delayedCall(5000, () => {
      if (bullet.active) bullet.destroy();
    });
  }

  update(time: number) {
    this.setVelocity(0)

    let playerLastDirection = ""
    let IsPlayerMoving = false

    if (this.KeysMove.up.isDown || this.KeysMove.down.isDown || this.KeysMove.left.isDown || this.KeysMove.right.isDown) {
      IsPlayerMoving = true
    }

    if (this.KeysMove.up.isDown) {
      this.setVelocityY(-this.speed)
      playerLastDirection = "up"
    }

    if (this.KeysMove.down.isDown) {
      this.setVelocityY(this.speed)
      playerLastDirection = "down"
    }

    if (this.KeysMove.left.isDown) {
      this.setVelocityX(-this.speed)
      playerLastDirection = "left"
    }

    if (this.KeysMove.right.isDown) {
      this.setVelocityX(this.speed)
      playerLastDirection = "right"
    }

    if (IsPlayerMoving) {
      switch (playerLastDirection) {
        case "up":
          this.anims.play(ANIMATION_KEYS.PLAYER_WALK_UP, true)
          break
        case "down":
          this.anims.play(ANIMATION_KEYS.PLAYER_WALK_DOWN, true)
          break
        case "right":
          this.anims.play(ANIMATION_KEYS.PLAYER_WALK_RIGHT, true)
          break
        case "left":
          this.anims.play(ANIMATION_KEYS.PLAYER_WALK_LEFT, true)
          break
        default:
          this.anims.stop()
      }
    } else {
      this.anims.stop()

      switch (playerLastDirection) {
        case "up":
          this.setFrame(0)
          break
        case "right":
          this.setFrame(4)
          break
        case "down":
          this.setFrame(8)
          break
        case "left":
          this.setFrame(12)
          break
      }
    }

    let directionShot = new Phaser.Math.Vector2(0, 0)

    if (this.Keyshoot.left.isDown) {
      directionShot.x -= 1
      this.setFrame(12)
    } else if (this.Keyshoot.right.isDown) {
      directionShot.x += 1
      this.setFrame(4)
    }

    if (this.Keyshoot.up.isDown) {
      directionShot.y -= 1
      this.setFrame(0)
    } else if (this.Keyshoot.down.isDown) {
      directionShot.y += 1
      this.setFrame(8)
      console.log("Disparo en dirección:", directionShot);
    }

    if (
      (directionShot.x !== 0 || directionShot.y !== 0) &&
      time > this.lastShotTime + this.shotCooldown
    ) {
      this.drawBullet(directionShot)
      this.lastShotTime = time
    }
  }
}