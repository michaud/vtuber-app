import {
    AnimationMixer,
    Clock
} from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FaceMeshFaceGeometry } from "./face.js";

import createSene from "./createScene.js";
import addModels from './models/addModels.js';
import setUpResize from './resizeUpdate.js';
import addCameraViewControls from "./addCameraViewControls.js";

const init = (av) => {

    const {
        renderer,
        scene,
        camera
    } = createSene();
    
    const mixer = new AnimationMixer(scene);
    const threeTime = new Clock();
    
    // Create a new geometry helper.
    const faceGeometry = new FaceMeshFaceGeometry();
    
    setUpResize(
        av,
        camera,
        faceGeometry,
        renderer
    );
    
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();
    
    const updateActions = addModels(
        scene,
        mixer,
        faceGeometry,
        threeTime,
        renderer,
        camera
    );

    addCameraViewControls(camera);

    return {
        updateActions,
        faceGeometry,
        controls,
        scene,
        mixer,
        faceGeometry,
        threeTime,
        renderer,
        camera,
        av
    };
};

export default init;
