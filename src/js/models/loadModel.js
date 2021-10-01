import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { LoadingManager } from 'three';

import paths from '../constants/paths';

const loadModel = (fileName, onLoad) => {

    const gltfLoadmanager = new LoadingManager();

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(paths.decoder);

    const GLTFLoad = new GLTFLoader(gltfLoadmanager)
        .setPath(paths.models)
        .setDRACOLoader(dracoLoader);

    GLTFLoad.load(
        fileName,
        onLoad
    );
};

export default loadModel;
