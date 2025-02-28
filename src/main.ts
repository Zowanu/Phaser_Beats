import * as Phaser from 'phaser';
import { Scenes } from './scene';  // 追加
import { SD } from './scene/Static';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: SD.Display.Width,
  height: SD.Display.Height,
  physics: {
		default: 'arcade',
		arcade: {
			gravity: {x:0, y: 0},
			debug: false
		}
	},
  parent: 'game-app',
  scene: Scenes,
  scale:{
    mode: Phaser.Scale.FIT,
    autoCenter:Phaser.Scale.CENTER_BOTH
  }
};

new Phaser.Game(config);