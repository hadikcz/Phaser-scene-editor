import EventEmitter from 'eventemitter3';
import * as dat from 'dat.gui';
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
         * @type {GUI}
         */
        this.debugGui = null;

        /**
         * @type {PlacableImage|null}
         */
        this.selectedImage = null;

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

        this.events.on(Events.SelectPlacedTexture, (selectedImage) => {
            self.selectedImage = selectedImage;
            if (!this.debugGui) {
                this._initDebugGUI();
            }
        }, this);

        this.events.on(Events.RemoveSelected, () => {
            if (self.selectedImage) {
                let i = self._createdImages.indexOf(self.selectedImage);
                self._createdImages.splice(i, 1);
                self.selectedImage.destroy(true);
            }
        }, this);

        // place debug object

        let image = new PlacableImage(self.scene, self, self.scene.cameras.main.centerX, self.scene.cameras.main.centerY, 'block');
        self._createdImages.push(image);
    }

    update () {
        this.cameraController.update();
    }

    /**
     * @TODO recreate as standalone class
     * @private
     */
    _initDebugGUI () {
        this.debugGui = new dat.GUI();

        var f0 = this.debugGui.addFolder('Image settings');
        f0.add(this.selectedImage, 'x').listen();
        f0.add(this.selectedImage, 'y').listen();
        f0.add(this.selectedImage, 'angle').listen();
        f0.add(this.selectedImage, 'scaleX').listen();
        f0.add(this.selectedImage, 'scaleY').listen();
        f0.add(this.selectedImage, 'alpha').listen();
        f0.add(this.selectedImage, 'depth').listen();
        f0.open();
    }
}
