import Phaser from "phaser"
import Enemy from "./Enemy"
import Player from "./Player"
import TEXTURE_KEYS from "../const/TextureKeys"

type SpawnPoint = [number, number];

export default class WaveManager {
  private scene: Phaser.Scene
  private player: Player
  private enemiesGroup: Phaser.Physics.Arcade.Group
  private waveNumber: number = 0
  private enemyPerWave: number = 10
  private spawnDelay: number = 500
  private waveDelay: number = 5000

  private spawnPoints: SpawnPoint[] = []
  public visualizeSpawns: boolean = false
  private visualMarkers: Phaser.GameObjects.Arc[] = [];

  public startWaves: boolean = false

  public droppedItemsGroup: Phaser.Physics.Arcade.Group

  constructor(scene: Phaser.Scene, player: Player, enemiesGroup: Phaser.Physics.Arcade.Group) {
    this.scene = scene
    this.player = player
    this.enemiesGroup = enemiesGroup
    this.droppedItemsGroup = scene.physics.add.group()
  }

  public setSpawnPositions(spawnPoints: SpawnPoint[]) {
    this.spawnPoints = spawnPoints

    if (this.visualizeSpawns) {
      this.drawSpawnsPoints()
    }
  }

  private drawSpawnsPoints() {
    // Clean previous markers if there are any
    this.visualMarkers.forEach(marker => marker.destroy())

    this.visualMarkers = []
    this.spawnPoints.forEach(([x, y]) => {
      const marker = this.scene.add.circle(x, y, 2, 0xff0000);
      this.visualMarkers.push(marker);
    })
  }

  public startWave() {
    if (this.startWaves) {
      this.nextWave()
    }
  }

  private nextWave() {
    this.waveNumber += 1
    const totalEnemies = this.enemyPerWave + this.waveNumber * 2

    this.scene.time.addEvent({
      delay: this.spawnDelay,
      repeatCount: totalEnemies - 1,
      callback: () => {
        const spawn = this.getRandomSpawnPoint()
        const [x, y] = spawn ?? [Phaser.Math.Between(100, 700), Phaser.Math.Between(100, 500)]

        const enemy = new Enemy(this.scene, x, y, TEXTURE_KEYS.ENEMIES, this.droppedItemsGroup)
        enemy.track = this.player

        this.enemiesGroup.add(enemy);
        this.scene.add.existing(enemy);
      },
      callbackScope: this
    })

    this.scene.time.delayedCall(this.waveDelay + totalEnemies * this.spawnDelay, () => {
      this.waitUntilEnemiesCleared(() => {
        this.nextWave()
      })
    })
  }

  private getRandomSpawnPoint(): SpawnPoint | undefined {
    if (this.spawnPoints.length > 0) {
      return Phaser.Utils.Array.GetRandom(this.spawnPoints);
    }

    return undefined
  }

  private waitUntilEnemiesCleared(callback: () => void) {
    this.scene.time.addEvent({
      delay: 100,
      callback: () => {
        if (this.enemiesGroup.countActive(true) === 0) {
          callback();
        } else {
          this.waitUntilEnemiesCleared(callback);
        }
      },
      callbackScope: this
    });
  }
}