import {
    AnimationMixer,
    Clock,
    OrthographicCamera,
    Scene,
    WebGLRenderer
} from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FaceMeshFaceGeometry } from "./face/face";

import createSene from "./scene/createScene";
import addModels from './models/addModels';
import setUpResize from './scene/resizeUpdate';
import addCameraViewControls from "./ui/addCameraViewControls";
import addModelInteractions from './ui/addModelInteractions';
import addComposer from './composer/addComposer';
import addDebugTools from './ui/addDebugTools';
import { Pane } from 'tweakpane';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { Model } from './types/model';

export type AppResources = {
        models:Model[],
        faceGeometry:FaceMeshFaceGeometry,
        controls:OrbitControls,
        scene:Scene,
        mixer:AnimationMixer,
        threeTime:Clock,
        renderer:WebGLRenderer,
        composer:EffectComposer,
        camera:OrthographicCamera,
        av:GumAudioVideo
};
const init = (
    av:GumAudioVideo,
    pane:Pane
):AppResources => {

    const {
        renderer,
        scene,
        camera
    } = createSene();

    const mixer = new AnimationMixer(scene);
    const threeTime = new Clock();

    /* Create a new geometry helper */
    const faceGeometry = new FaceMeshFaceGeometry();

    setUpResize(
        av,
        camera,
        faceGeometry,
        renderer
    );

    const controls:OrbitControls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    const models = addModels(
        scene,
        mixer,
        faceGeometry,
        ['emojis']
    );

    addModelInteractions(models, threeTime, pane);
    pane.addSeparator();
    const composer = addComposer(scene, camera, renderer, pane);

    addCameraViewControls(camera);
    addDebugTools(scene);

    return {
        models,
        faceGeometry,
        controls,
        scene,
        mixer,
        threeTime,
        renderer,
        composer,
        camera,
        av
    };
};

export default init;
