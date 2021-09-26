import {
    WebGLRenderer,
    Scene,
    OrthographicCamera,
    PCFSoftShadowMap,
    sRGBEncoding,
    SpotLight,
    HemisphereLight,
    AmbientLight,
    ACESFilmicToneMapping,
    PMREMGenerator,
    LoadingManager,
    UnsignedByteType
} from 'three';

import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import paths from './paths.js';
import { RGBELoaderCallback } from './RGBELoading.js';

const createSene = () => {

    const canvas = document.querySelector("canvas");
    // Set a background color, or change alpha to false for a solid canvas.
    const renderer = new WebGLRenderer({ antialias: true, alpha: true, canvas });
    // renderer.setClearColor(0x202020);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    renderer.outputEncoding = sRGBEncoding;

    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.physicallyCorrectLights = true;

    renderer.shadowMap.autoUpdate = true;
    renderer.receiveShadow = true;

    const pmremGenerator = new PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    const scene = new Scene();
    const camera = new OrthographicCamera(1, 1, 1, 1, -1000, 1000);

    // Add lights.
    const spotLight = new SpotLight(0xffffff, 0.8);
    spotLight.position.set(0.5, 0.5, 1);
    spotLight.position.multiplyScalar(400);
    scene.add(spotLight);

    spotLight.castShadow = true;

    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    spotLight.shadow.camera.near = 200;
    spotLight.shadow.camera.far = 800;

    spotLight.shadow.camera.fov = 40;

    spotLight.shadow.bias = -0.001125;

    scene.add(spotLight);

    const hemiLight = new HemisphereLight(0xffffff, 0x080808, 0.1);
    scene.add(hemiLight);

    const ambientLight = new AmbientLight(0x404040, 0.1);
    scene.add(ambientLight);

    const rgbeLoadManager = new LoadingManager();
    const RGBELoad = new RGBELoader(rgbeLoadManager)
        .setDataType(UnsignedByteType)
        .setPath(paths.hdr);


    RGBELoad.load(
        'vintage_measuring_lab_1k.hdr',
        RGBELoaderCallback(scene, pmremGenerator)
    );

    return {
        renderer,
        scene,
        camera,
        canvas
    };
}

export default createSene;
