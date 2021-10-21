import {
    AnimationMixer,
    Clock
} from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import createSene from "./scene/createScene";
import addModels from './models/addModels';
import setUpResize from './scene/resizeUpdate';
import addCameraViewControls from "./ui/addCameraViewControls";
import addModelInteractions from './ui/addModelInteractions';
import addComposer from './composer/addComposer';
import addDebugTools from './ui/addDebugTools';
import { Pane } from 'tweakpane';
import { AppResources } from 'types/AppResources';
import { GumAudioVideo } from '../../third_party/gum-av';
import addstages from './stage/addstages';
import { Model } from 'types/model';
import FaceGeometry from 'face/FaceGeometry';

const init = (
    av : GumAudioVideo,
    pane : Pane
) : AppResources => {

    const {
        renderer,
        scene,
        camera,
        lights
    } = createSene();

    const mixer = new AnimationMixer(scene);
    const threeTime = new Clock();

    /* Create a new geometry helper */
    const faceGeometry = new FaceGeometry();

    setUpResize(
        av,
        camera,
        faceGeometry,
        renderer
    );

    const controls : OrbitControls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    const models = addModels(
        scene,
        mixer,
        faceGeometry,
        ['emojis']
    );

    addModelInteractions(models, pane, 'models');
    pane.addSeparator();
    
    const composer = addComposer(scene, camera, renderer, pane);

    const stages : Array<Model> = addstages(scene, mixer);
    pane.addSeparator();

    addModelInteractions(stages, pane, 'stages');

    addCameraViewControls(camera);
    addDebugTools(scene, controls, lights);

    return {
        models,
        stages,
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
