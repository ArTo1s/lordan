import Phaser from 'phaser';
import BootsScene from './scenes/BootScene' 
import PlayGameScene from './scenes/PlayGameScene' 
import ResultScene from './scenes/ResultScene' 

const config = {
    width: 1000,
    height: 725,
    type: Phaser.AUTO,
    backgroundColor: 0xffffff,
    parent: 'gameDiv',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [BootsScene, PlayGameScene, ResultScene],
}

const game = new Phaser.Game(config);
