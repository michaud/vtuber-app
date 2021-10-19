import { runOnce } from "../utils/runOnce";
import updateWithFaceDetection from "../faceDetection/updateWithFaceDetection";

import { VoidRunner } from "../types/voidRunner";
import { AllResources } from "../types/AllResources";

const render = (
    onInit : VoidRunner,
    onFirstFaceDetect : VoidRunner,
    {
        faceDetectionModel,
        models,
        stages,
        controls,
        scene,
        mixer,
        faceGeometry,
        threeTime,
        renderer,
        camera,
        av,
        composer
    } : AllResources
) : () => void => {

    const flipCamera : boolean = true;
    let onInitialize : VoidRunner = onInit;
    const runOnFirstFaceDetect = runOnce(onFirstFaceDetect);
    const runOnInitialize = runOnce(onInitialize);

    const rerender : VoidRunner = () => {

        requestAnimationFrame(() => rerender());

        runOnFirstFaceDetect();

        const delta : number = threeTime.getDelta();
        mixer && mixer.update(delta);

        updateWithFaceDetection(
            faceDetectionModel,
            av,
            flipCamera,
            faceGeometry,
            models,
            stages,
            threeTime.elapsedTime
        );

        controls.update();

        //renderer.render(scene, camera);
        composer.render();

        runOnInitialize();
    };

    return rerender;
};

export default render;
