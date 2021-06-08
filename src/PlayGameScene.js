import {Scene} from 'phaser';
//import {RetentionMatrix} from '../modules/RetentionMatrix';

const RetentionMatrixConfig = {
    groundParams: [{
      value: 1,
      count: 20
    },
    {
      value: 2,
      count: 6
      }],
    xLength: 7,
    yLength: 7,
    defaultValue: 0,
    excluded: null
  }

class PlayGameScene extends Scene {

  constructor() {
    super({ key: 'PlayGameScene' })
	}

    preload(){
      this.load.setPath('src/assets/');
         this.load.image('gamescene_background', 'gamescene_background.png');
         this.load.atlas('cellIcons', 'texture.png', 'texture.json');
        this.load.image('logo', 'logo.png');
         
    }

    create(){
         this.add.image(0, 0, 'gamescene_background').setOrigin(0);
         this.add.image(100, 100, 'cellIcons', '1.png');  
        this.add.image(400, 300, 'logo');

       // const matrix = new RetentionMatrix(RetentionMatrixConfig);
    }

    update(){

    }
}

export default PlayGameScene;