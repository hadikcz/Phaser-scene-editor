import EventEmitter from 'eventemitter3';
import CameraController from './CameraController';
import Events from './structs/Events';
import UI from './UI';
import PlacableImage from './placableObjects/PlacableImage';

export default class SceneEditor {
    /**
     * @param {Phaser.Scene} scene
     */
    constructor (scene) {
        /**
         * @type {EventEmitter}
         */
        this.events = new EventEmitter();

        /**
         * @private
         * @type {Phaser.Scene}
         */
        this.scene = scene;

        /**
         * @private
         * @type {UI}
         */
        this.ui = new UI(scene, this);

        /**
         * @private
         * @type {CameraController}
         */
        this.cameraController = new CameraController(this.scene);

        /**
         * @type {PlacableImages[]}
         * @private
         */
        this._createdImages = [];

        // drag event
        this.scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        // events
        let self = this;
        this.events.on(Events.SelectNewTexture, (selectedTextureKey) => {
            if (selectedTextureKey === undefined) return;
            let image = new PlacableImage(self.scene, self, self.scene.cameras.main.centerX, self.scene.cameras.main.centerY, selectedTextureKey);
            self._createdImages.push(image);
        }, this);

        // place debug object

        let image = new PlacableImage(self.scene, self, self.scene.cameras.main.centerX, self.scene.cameras.main.centerY, 'block');
        self._createdImages.push(image);
    }

    update () {
        this.cameraController.update();
    }
}
