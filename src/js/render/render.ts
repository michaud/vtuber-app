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

        const rendererPass = passes.find(pass => pass.name === 'godRayPass');

        if(rendererPass.params.enabled) {

            rendererPass.render();
            if(!dogRayReset) dogRayReset = runOnce(rendererPass.reset);

        } else {
            /* should run at least once */
            dogRayReset?.();
            passes.forEach(pass => pass.passComposer?.render())
            composer.render();
        }

        //renderer.render(scene, camera);

        runOnInitialize();
    };

    return rerender;
};

export default render;
