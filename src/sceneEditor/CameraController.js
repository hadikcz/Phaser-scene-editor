export default class CameraController {
    /**
     * @param {Phaser.Scene} scene
     */
    constructor (scene) {
        /**
         * @private
         * @type {Phaser.Scene}
         */
        this.scene = scene;

        let cursors = this.scene.input.keyboard.createCursorKeys();

        let controlConfig = {
            camera: this.scene.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            acceleration: 0.04,
            drag: 0.0005,
            maxSpeed: 0.7
        };

        /**
         * @private
         */
        this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
    }

    update () {
        this.controls.update(5);
    }
}
