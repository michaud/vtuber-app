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

        passes.forEach(pass => {

            if(pass.passComposer) {

                pass.passComposer.render();
            }

            pass.render?.()
        })

        //renderer.render(scene, camera);
        //composer.render();

        runOnInitialize();
    };

    return rerender;
};

export default render;
