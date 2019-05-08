/* eslint-disable no-trailing-spaces */
/* global __DEV__ */
import Phaser from 'phaser';
import SceneEditor from 'sceneEditor/SceneEditor';

export default class GameScene extends Phaser.Scene {
    constructor () {
        super({ key: 'GameScene' });
    }

    create () {
        window.gameScene = this;

        this.physics.world.setBounds(0, 0, 5000, 5000);

        this.sceneEditor = new SceneEditor(this);
    }

    update () {
        this.sceneEditor.update();
    }
}
