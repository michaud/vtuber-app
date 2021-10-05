import { runOnce } from "../utils/runOnce";
import updateWithFaceDetection from "../faceDetection/updateWithFaceDetection";

import { AllResources } from '../index';
import { VoidRunner } from "../types/voidRunner";

const render = (
    onInit: VoidRunner,
    onFirstFaceDetect: VoidRunner,
    {
        faceDetectionModel,
        models,
        controls,
        scene,
        mixer,
        faceGeometry,
        threeTime,
        renderer,
        camera,
        av,
        composer
    }:AllResources
):() => void => {

    const flipCamera : boolean = true;
    let onInitialize : VoidRunner = onInit;
    const runOnFirstFaceDetect = runOnce(onFirstFaceDetect);
    const runOnInitialize = runOnce(onInitialize);

    const rerender:VoidRunner = () => {

        runOnFirstFaceDetect();

        const delta:number = threeTime.getDelta();
        mixer && mixer.update(delta);

        updateWithFaceDetection(
            faceDetectionModel,
            av,
            flipCamera,
            faceGeometry,
            models,
            threeTime.elapsedTime
        );

        controls.update();

        //renderer.render(scene, camera);
        composer.render();
        requestAnimationFrame(() => rerender());

        runOnInitialize();
    };

    return rerender;
};

export default render;
