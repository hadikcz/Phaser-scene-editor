import Events from './../structs/Events';
import SceneEditor from './../SceneEditor';

export default class PlacableImage extends Phaser.GameObjects.Container {
    constructor (scene, sceneEditor, x, y, key, frame = null) {
        super(scene, x, y, []);
        this.scene.add.existing(this);

        /**
         * @private
         * @type {SceneEditor}
         */
        this.sceneEditor = sceneEditor;

        /**
         * @private
         * @type {Phaser.GameObjects.Image}
         */
        this.image = this.scene.add.image(0, 0, key, frame);

        let rectangleThickness = 10;
        /**
         * @private
         * @type {Phaser.GameObjects.Rectangle}
         */
        this.selectRectangle = this.scene.add.rectangle(0, 0, this.image.width + rectangleThickness, this.image.height + rectangleThickness, 0x00FF00, 1).setAlpha(0.25).setVisible(false);
        this.add(this.selectRectangle);
        this.add(this.image);

        /**
         * @type {boolean}
         */
        this.isSelected = false;

        this.setSize(this.image.width, this.image.height);

        this.setInteractive({ cursor: 'pointer' });
        this.scene.input.setDraggable(this);

        this.on('pointerover', () => {
            this.selectRectangle.setVisible(true);
        });

        this.on('pointerout', () => {
            if (!this.isSelected) {
                this.selectRectangle.setVisible(false);
            }
        });

        // select
        this.on('pointerdown', () => {
            // this.setTint(0x00ff00);
            this.select();
        });

        this.sceneEditor.events.on(Events.SelectPlacedTexture, this.unselect, this);
    }

    select () {
        this.sceneEditor.events.emit(Events.SelectPlacedTexture, this);
        this.isSelected = true;
        this.selectRectangle.setVisible(true);
        setTimeout(() => {this.selectRectangle.setAlpha(0.75);}, 50);
    }

    unselect () {
        this.selectRectangle.setAlpha(0.25);
        this.selectRectangle.setVisible(false);
        this.isSelected = false;
    }
}
