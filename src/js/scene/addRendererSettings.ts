import {
    ACESFilmicToneMapping,
    PCFSoftShadowMap,
    ReinhardToneMapping,
    sRGBEncoding,
    WebGLRenderer
} from "three";

const addRendererSettings = (renderer : WebGLRenderer) : void => {

    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    renderer.shadowMap.autoUpdate = true;
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;

    renderer.physicallyCorrectLights = true;
}

export default addRendererSettings;
