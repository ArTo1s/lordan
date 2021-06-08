import { Scene } from 'phaser';
import { RetentionMatrix } from '../modules/RetentionMatrix';
import { RetentionMatrixConfig } from '../modules/config'

class PlayGameScene extends Scene {

  constructor() {
    super({ key: 'PlayGameScene' })
  }

  create() {
    this.createAnimations();

    this.add.image(0, 0, 'gamescene_background').setOrigin(0);
    this.sound_take = this.sound.add('take');
    let container = this.add.container(154.5, 271.5);

    const RandomizedMatrix = new RetentionMatrix(RetentionMatrixConfig);
    this.ground = RandomizedMatrix.getResult();
    console.log('ground', this.ground);

    this.cameras.main.fadeIn(500);
    this.movesLeft = 7;
    this.results = [0, 0, 0];
    this.frames = ["0.png", "1.png", "2.png"];

    this.drawGameGrid(RetentionMatrixConfig, (x, y, row, col) => {
      let item = this.add.sprite(x, y, 'cellIcons', 'empty.png');
      item.setDataEnabled().setData({ row, col, item }).setInteractive();
      container.add(item);
    });

    this.input.on('gameobjectdown', this.onGameObjectDown, this);

    this.clickCountText = this.add.text(this.game.renderer.width - 160, this.game.renderer.height - 75, this.movesLeft, {
      fontFamily: 'AngieBold',
      fontSize: 135,
      stroke: '#000',
      strokeThickness: 1
    }).setOrigin(0.5).setAngle(3);

    const pirat = this.add.sprite(this.game.renderer.width - 370, this.game.renderer.height - 155, "pirat").setScale(1.55);
    pirat.play("shake");

    this.time.addEvent({
      delay: 8000,
      loop: true,
      callback: () => {
        pirat.play("shake");
      }
    });
  }

  drawGameGrid(config, callback) {
    let box = 47;
    for (let row = 0; row < config.xLength; row++) {
      let y = (box * row) + (row * 6.5);
      for (let col = 0; col < config.yLength; col++) {
        let x = (box * col) + (col * 6.5);
        callback(x, y, row, col);
      }
    }
  }

  onGameObjectDown(pointer, sprite) {
    const [row, col, clickedItem] = sprite.getData(['row', 'col', 'item']);
    if (typeof clickedItem !== "undefined" && this.movesLeft != 0) {
      let frameNumber = this.ground[row][col];
      clickedItem.setFrame(this.frames[frameNumber]).removeInteractive();
      this.calculateResults(frameNumber);
      this.clickCountText.setText(this.movesLeft);
      this.sound_take.play();
      //this.cameras.main.shake(100);
  
    }
  }

  calculateResults(frameNumber) {
    this.movesLeft--;
    let cnt = this.results[frameNumber];
    cnt++;
    this.results[frameNumber] = cnt;
    this.checkIfMeetWinningCombination(this.results);
  }

  checkIfMeetWinningCombination(results) {
    const [heart, coin, treasure] = results;
    if (treasure == 3) {
      this.goToResultScene('treasure');
    } else if (coin === 4) {
      this.goToResultScene('coin');
    }

    if (this.movesLeft == 0) {
      this.goToResultScene('heart');
    }
  }

  goToResultScene(prizeType) {
    let result = {};
    switch (prizeType) {
      case 'treasure':
        result = {
          text: '50 FREESPINS',
          value: 'C'
        };
        break;

      case 'coin':
        result = {
          text: '10 FREESPINS',
          value: 'B'
        };
        break;

      case 'heart':
        result = {
          text: '5 FREESPINS',
          value: 'A'
        };
        break;

      default:
        result = {
          text: 'something went wrong',
          value: 'error'
        };
    }
    //this.cameras.main.fadeOut(300);
    this.time.delayedCall(1000, () => {
      this.scene.start('ResultScene', result);
		});

  }

  createAnimations() {

    this.anims.create({
      key: "shake",
      frameRate: 7,
      frames: this.anims.generateFrameNames("pirat", {
        prefix: "Animation/Animation_",
        suffix: ".png",
        start: 0,
        end: 11,
        zeroPad: 4
      }),
      repeat: 2
    });
  }

  update() {

  }
}

export default PlayGameScene;