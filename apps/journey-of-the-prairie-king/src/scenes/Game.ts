import Phaser from "phaser"

import Player from "../objects/Player";
import WaveManager from "../objects/WaveManager";

import SCENES from "../const/scenes"
import TEXTURE_KEYS from "../const/TextureKeys";

import PlayerAnims from "../objects/Anims/PlayerAnims";
import EnemyAnims from "../objects/Anims/EnemyAnims";
import type Enemy from "../objects/Enemy";
import type { ITEMS_TYPE } from "../types/itemsType";

import UI from "../objects/UI";

export default class Game extends Phaser.Scene {
  private player!: Player
  private enemiesGroup!: Phaser.Physics.Arcade.Group
  private waveManager!: WaveManager

  constructor() {
    super({ key: SCENES.GAME })
  }

  create() {
    const centerX = this.cameras.main.width / 2
    const centerY = this.cameras.main.height / 2

    this.player = new Player(this, centerX, centerY, TEXTURE_KEYS.PLAYER);

    PlayerAnims(this)
    EnemyAnims(this)

    this.enemiesGroup = this.physics.add.group()

    this.waveManager = new WaveManager(this, this.player, this.enemiesGroup)
    this.waveManager.startWaves = true
    this.waveManager.visualizeSpawns = true

    this.waveManager.setSpawnPositions([
      [230, 230],
      [130, 214],
      [600, 400]
    ]);

    this.waveManager.startWave()

    this.physics.add.overlap(
      this.player.bullets,
      this.enemiesGroup,
      (bulletObj, enemyObj) => {
        const bullet = bulletObj as Phaser.Physics.Arcade.Sprite
        const enemy = enemyObj as Enemy

        bullet.destroy()
        enemy.takeDamage(this.player.damage)
      },
      undefined,
      this
    )

    this.physics.add.overlap(
      this.player,
      this.waveManager.droppedItemsGroup,
      (playerObj, itemObj) => {
        const player = playerObj as Player
        const item = itemObj as Phaser.Physics.Arcade.Sprite

        player.collectItem(item.getData("itemData") as ITEMS_TYPE)
        item.destroy()
      },
    )
  }

  update(time: number) {
    this.player.update(time)

    this.enemiesGroup.children.iterate((enemyObj) => {
      const enemy = enemyObj as Enemy;
      if (enemy.active) {
        enemy.update();
      }

      return true
    });
  }
}