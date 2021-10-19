import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { LoadingManager } from 'three';
import paths from '../constant/paths';

const loadModel = (
    fileName:string,
    path:string,
    onLoad:(gltf:GLTF) => void) => {

    const gltfLoadmanager = new LoadingManager();

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(paths.decoder);

    const GLTFLoad = new GLTFLoader(gltfLoadmanager)
        .setPath(path)
        .setDRACOLoader(dracoLoader);

    GLTFLoad.load(
        fileName,
        onLoad
    );
};

export default loadModel;
