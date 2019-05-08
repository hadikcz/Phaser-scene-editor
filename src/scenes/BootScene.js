/* global gamee */
import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
    constructor () {
        super({ key: 'BootScene', plugins: ['Loader'] });
    }

    preload () {
        const progress = this.add.graphics();
        this.load.on('progress', (value) => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60);
        });

        this.load.on('complete', () => {
            progress.destroy();
            this.scene.start('GameScene');
        }, this);
        this.load.image('Background', 'assets/images/Background.png');
        this.load.image('Cloud_1', 'assets/images/Cloud_1.png');
        this.load.image('Cloud_2', 'assets/images/Cloud_2.png');
        this.load.image('Hills_1', 'assets/images/Hills_1.png');
        this.load.image('Hills_2', 'assets/images/Hills_2.png');
        this.load.image('Mountain_1', 'assets/images/Mountain_1.png');
        this.load.image('Mountain_2', 'assets/images/Mountain_2.png');
        this.load.image('Mountain_3', 'assets/images/Mountain_3.png');
        this.load.image('Mountain_4', 'assets/images/Mountain_4.png');
        this.load.image('Sky', 'assets/images/Sky.png');
        this.load.image('Spike_Down', 'assets/images/Spike_Down.png');
        this.load.image('Spike_Left&Right', 'assets/images/Spike_Left&Right.png');
        this.load.image('Spike_Up', 'assets/images/Spike_Up.png');

        // this.load.atlas('assets2', 'assets/images/assets2.png', 'assets/images/assets2.json');
    }
}
