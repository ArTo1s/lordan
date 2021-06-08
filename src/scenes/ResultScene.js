import { Scene } from 'phaser';
import {MessageSender} from '../modules/MessageSender';

class ResultScene extends Scene {

  constructor() {
    super({ key: 'ResultScene' })
  }

  init(data) {
    this.result = data;
  }

  create() {
    this.cameras.main.fadeIn(800);

    const messenger = new MessageSender();
    messenger.send({type: 'Treasure', value: this.result.value});

    this.add.image(0, 0, 'result_screen').setOrigin(0);
    this.addResultMessage();
  }

  addResultMessage() {
    this.add.text(this.game.renderer.width / 2 + 15, this.game.renderer.height / 2 + 20, this.result.text, {
      fontFamily: 'AngieBold',
      fontSize: 60,
      stroke: '#dfd597',
      strokeThickness: 2,
      color: '#f00'
    }).setOrigin(0.5).setAngle(1);
  }

}

export default ResultScene;