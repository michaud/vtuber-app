import { VoidRunner } from "types/voidRunner";
import { AllResources } from "types/AllResources";
import { runOnce } from "../utils/runOnce";
import updateWithFaceDetection from "../faceDetection/updateWithFaceDetection";

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
        composer,
        passes
    } : AllResources
) : () => void => {

    const flipCamera : boolean = true;
    let onInitialize : VoidRunner = onInit;
    const runOnFirstFaceDetect = runOnce(onFirstFaceDetect);
    const runOnInitialize = runOnce(onInitialize);
    let dogRayReset : VoidRunner;

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

        passes.forEach(pass => pass.passComposer?.render())

        const dogRayPass = passes.find(pass => pass.name === 'godRayPass');

        if(dogRayPass && dogRayPass?.params.enabled) {

            dogRayPass.render();
            /* capture the reset */
            if(!dogRayReset) dogRayReset = runOnce(dogRayPass.reset);

        } else {
            /* should run once */
            dogRayReset?.();
            composer.render();
        }

        //renderer.render(scene, camera);

        runOnInitialize();
    };

    return rerender;
};

export default render;
