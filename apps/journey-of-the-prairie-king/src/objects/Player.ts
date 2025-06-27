import Phaser from "phaser"
import ANIMATION_KEYS from "../const/AnimationKeys";
import TEXTURE_KEYS from "../const/TextureKeys";
import type { Effect, ITEMS_TYPE } from "../types/itemsType";
import UI from "./UI";

type EffectFunction = {
  duration: number,
  effect?: number
  weapon?: string
}

export default class Player extends Phaser.Physics.Arcade.Sprite {
  private KeysMove!: Phaser.Types.Input.Keyboard.CursorKeys
  private Keyshoot!: Phaser.Types.Input.Keyboard.CursorKeys
  private lastShotTime: number = 0
  private shotCooldown: number = 400
  private currentWeapon: string = "default"

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

  public collectItem(item: ITEMS_TYPE) {
    const effect = item.effect

    if (this.inventory.length > 1) {
      this.activateItem()
    }

    if (effect?.upCoins) {
      this.coins += effect.upCoins
      this.updateUI.updateCoins(this.coins)
    } else if (effect?.upLife) {
      this.lifes += effect.upLife;
      this.updateUI.updateLife(this.lifes)
    } else {
      this.inventory.push(item)
      this.updateUI.updateInventory(item.spriteFrame)
    }
  }

  private durationEffect(time: number, resetEffect: () => void) {
    this.scene.time.delayedCall(time, resetEffect)
  }

  private clearInventory() {
    this.inventory = []
    this.updateUI.clearInventory()
  }

  private activateItem() {
    if (this.inventory.length === 0) return

    const item = this.inventory.shift() as ITEMS_TYPE
    const effect = item.effect

    if (effect.upSpeed) {
      this.itemCoffee({ duration: effect.durationEffect ?? 1000, effect: effect.upSpeed })
    }

    if (effect.weapon) {
      this.setWapon({ duration: effect.durationEffect ?? 1000, weapon: effect.weapon })
    }

    this.clearInventory()
  }

  private itemCoffee({ duration, effect }: EffectFunction) {
    effect = effect || 1

    this.speed *= effect

    console.log(this.speed)

    this.durationEffect(duration, () => {
      this.speed /= effect
      console.log(this.speed)
    })
  }

  private setWapon({ duration, weapon }: EffectFunction) {
    weapon = weapon || "default"

    this.currentWeapon = weapon
    this.durationEffect(duration, () => {
      this.currentWeapon = "default"
      this.shotCooldown = 400
    })
  }

  private drawBullet(dir: Phaser.Math.Vector2) {
    switch (this.currentWeapon) {
      case "heavyMachine":
        this.heavyMachine(dir, 100);
        break;
      case "shotgun":
        this.shootShotgun(dir);
        break;
      case "sheriffBadge":
        this.shootSheriffBadge(dir);
        break;
      case "wagonWheel":
        this.shootWagonWheel();
        break
      default:
        this.shootBasic(dir);
    }
  }

  private shootBasic(dir: Phaser.Math.Vector2) {
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

  private shootShotgun(dir: Phaser.Math.Vector2) {
    const baseAngle = dir.angle()
    const spread = Phaser.Math.DegToRad(15); // 15 degrees spread

    for (let i = -1; i <= 1; i++) {
      const angle = baseAngle + i * spread;
      const direction = new Phaser.Math.Vector2(Math.cos(angle), Math.sin(angle));
      this.shootBasic(direction);
    }
  }

  private shootSheriffBadge(dir: Phaser.Math.Vector2) {
    this.itemCoffee({ duration: 1000, effect: 1.5 }) // Increase speed for sheriff badge
    this.shotCooldown = 200 // Reduce cooldown for sheriff badge
    this.shootShotgun(dir);
  }

  private heavyMachine(dir: Phaser.Math.Vector2, fireRate: number = 100) {
    this.shotCooldown = fireRate // Reduce cooldown for heavy machine gun
    this.shootBasic(dir);
  }

  private shootWagonWheel() {
    for (let i = -1; i <= 8; i++) {
      const angle = Phaser.Math.DegToRad(i * 45); // 8 directions, 45 degrees apart
      const direction = new Phaser.Math.Vector2(Math.cos(angle), Math.sin(angle));
      this.shootBasic(direction);
    }
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