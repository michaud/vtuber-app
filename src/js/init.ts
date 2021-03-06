import { AppResources } from 'types/AppResources';
import { Model } from 'types/model';
import {
    AnimationMixer,
    Clock
} from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import createSene from "./scene/createScene";
import addModels from 'models/addModels';
import setUpResize from './scene/resizeUpdate';
import addComposer from './composer/addComposer';
import { Pane } from 'tweakpane';
import addstages from './stage/addstages';
import FaceGeometry from 'face/FaceGeometry';
import { GumAudioVideo } from 'thirdparty/gum-av';
import addUI from './ui/addUI';

const init = (
    av : GumAudioVideo,
    pane : Pane
) : AppResources => {

    const canvas: HTMLCanvasElement = document.getElementById("three-scene") as HTMLCanvasElement;

    const {
        renderer,
        scene,
        camera
    } = createSene(canvas);

    const mixer = new AnimationMixer(scene);
    const threeTime = new Clock();

    /* Create a new geometry helper */
    const faceGeometry = new FaceGeometry({
        customScale: 3
    });

    const {
        composer,
        passes
    } = addComposer(
        scene,
        camera,
        renderer
    );

    setUpResize(
        av,
        camera,
        faceGeometry,
        renderer,
        canvas,
        passes
    );

    const controls : OrbitControls = new OrbitControls(
        camera,
        renderer.domElement
    );

    controls.update();

    const models = addModels(
        scene,
        mixer,
        faceGeometry,
        ['emojis']
    );

    const stages : Array<Model> = addstages({
        scene,
        mixer,
        autoLoad: ['baseStage']
    });

    addUI(
        pane,
        models,
        passes,
        stages,
        camera,
        scene,
        controls,
        renderer
    );

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
        av,
        passes
    };
};

export default init;
