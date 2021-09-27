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
import addModelToUIList from "./ui/addModelToUIList.js";

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
    
    const models = addModels(
        scene,
        mixer,
        faceGeometry,
        threeTime,
        renderer,
        camera
    );

    models.forEach(model => {

        const modelActionHandlers = Object
            .keys(model.actions)
            .reduce((acc, key) => ({
                ...acc,
                [key]: () => model.actions[key](threeTime)
            })
        );

        addModelToUIList(
            model,
            () => model.create(),
            modelActionHandlers
        )
    });

    addCameraViewControls(camera);

    return {
        models,
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
