import { Scene } from 'phaser';

class ResultScene extends Scene {

  constructor() {
    super({ key: 'ResultScene' })
  }

  init(data) {
    this.resultText = data.text;
  }

  create() {
    this.cameras.main.fadeIn(800);

    this.add.image(0, 0, 'result_screen').setOrigin(0);
    this.addResultMessage();
  }

  addResultMessage() {
    this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 20, this.resultText, {
      fontFamily: 'AngieBold',
      fontSize: 60,
      stroke: '#dfd597',
      strokeThickness: 2,
      color: '#f00'
    }).setOrigin(0.5).setAngle(1);
  }

}

export default ResultScene;