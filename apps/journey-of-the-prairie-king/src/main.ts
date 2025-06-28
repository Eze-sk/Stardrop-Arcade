import '@fontsource-variable/pixelify-sans';
import "./style.css"

import Phaser from 'phaser';

import Game from './scenes/Game';
import Preload from "./scenes/Preload";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  antialias: false,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0, x: 0 },
      debug: false,
    }
  },
  scene: [Preload, Game],
}

export default new Phaser.Game(config);