import Phaser from 'phaser';
import Bootscene from './scenes/Bootscene' 
import PlayGameScene from './scenes/PlayGameScene' 

/*
class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image('logo', logoImg);
    }
      
    create ()
    {
        const logo = this.add.image(400, 150, 'logo');
      
        this.tweens.add({
            targets: logo,
            y: 450,
            duration: 2000,
            ease: "Power2",
            yoyo: true,
            loop: -1
        });
    }
} */

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
    scene: [Bootscene, PlayGameScene],
}

const game = new Phaser.Game(config);
