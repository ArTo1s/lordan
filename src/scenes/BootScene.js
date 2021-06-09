import { Scene } from 'phaser';

class BootScene extends Scene {

  constructor() {
    super({ key: 'BootScene' })
  }

  preload() {
    this.load.setPath('./src/assets/');
    this.load.image('gamescene_background', 'maingame.png');
    this.load.image('result_screen', 'result_screen.png');
    this.load.atlas('cellIcons', 'texture.png', 'texture.json');
    this.load.audio("take", ["sounds/take.mp3"]);
    this.load.atlas('pirat', 'pirat.png', 'pirat.json');
  }

  create() {
    this.scene.start('PlayGameScene');
  }

}

export default BootScene;
