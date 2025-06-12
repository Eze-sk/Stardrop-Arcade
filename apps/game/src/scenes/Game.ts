import Phaser from "phaser"
import Player from "../objects/Player";

import SCENES from "../const/scenes"


export default class Game extends Phaser.Scene {
  private player!: Player

  constructor() {
    super({ key: SCENES.GAME })
  }

  create() {
    this.player = new Player(this, this.cameras.main.width / 2, this.cameras.main.height / 2)
  }
}