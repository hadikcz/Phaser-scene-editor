import $ from 'jquery';
import Events from './structs/Events';
import SceneEditor from './SceneEditor';

export default class UI {
    /**
     * @param {Phaser.Scene} scene
     * @param {SceneEditor} sceneEditor
     */
    constructor (scene, sceneEditor) {
        /**
         * @private
         * @type {Phaser.Scene}
         */
        this.scene = scene;

        /**
         * @private
         * @type {SceneEditor}
         */
        this.sceneEditor = sceneEditor;

        let self = this;
        $(document).on('click', '.imageRow', function() {
            let textureKey = $(this).data('id');
            self.sceneEditor.events.emit(Events.SelectNewTexture, textureKey);
        });

        $('#cameraZoom').change(function() {
           let zoom = this.value;
           $('#zoomValue').html(zoom * 100);
           self.scene.cameras.main.setZoom(zoom);
        });

        $('#remove').click(() => {
           self.sceneEditor.events.emit(Events.RemoveSelected);
        });

        this._init();
    }

    /**
     * @private
     */
    _init () {
        this._renderTexturesList();
    }

    /**
     * @private
     */
    _renderTexturesList () {
        // get all textures and draw them
        let html = '';
        this.scene.textures.getTextureKeys().forEach((textureKey) => {
            html += this._renderRowForTexture(textureKey);
        });

        // draw them
        $('.imagesList').html(html);
    }

    /**
     * @param {string} textureKey
     * @return {string}
     * @private
     */
    _renderRowForTexture (textureKey) {
        let base64 = this.scene.textures.getBase64(textureKey);
        return `
            <div class="imageRow" data-id="` + textureKey + `">
                <img src="` + base64 + `">
                <div class="title">` + textureKey + `</div>
            </div>
        `;
    }
}
