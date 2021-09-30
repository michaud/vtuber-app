import {
    AnimationMixer,
    Clock
} from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FaceMeshFaceGeometry } from "./face/face.js";

import createSene from "./scene/createScene.js";
import addModels from './models/addModels.js';
import setUpResize from './scene/resizeUpdate.js';
import addCameraViewControls from "./ui/addCameraViewControls.js";
import addModelInteractions from './ui/addModelInteractions.js';
import addComposer from './composer/addComposer.js';
import {
    Pane
} from 'tweakpane';
// import * as EssentialsPlugin from '@tweakpane/plugin-essentials';
import addDebugTools from './ui/addDebugTools.js';

const init = (av) => {

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
    
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();
    
    const models = addModels(
        scene,
        mixer,
        faceGeometry,
        ['emojis']
    );

    const pane = new Pane();
    pane.containerElem_.style.width = '250px';
    pane.containerElem_.style.left = 0;
    // pane.registerPlugin(EssentialsPlugin);

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
        faceGeometry,
        threeTime,
        renderer,
        composer,
        camera,
        av
    };
};

export default init;
