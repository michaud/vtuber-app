import { runOnce } from "../utils/runOnce";
import updateWithFaceDetection from "./../faceDetection/updateWithFaceDetection";

const render = (
    onInit,
    onFirstFaceDetect,
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
    }
) => {

    const flipCamera = true;
    let onInitialize = onInit;
    const runOnFirstFaceDetect = runOnce(onFirstFaceDetect);
    const runOnInitialize = runOnce(onInitialize);

    const rerender = async ()=> {

        runOnFirstFaceDetect();

        const delta = threeTime.getDelta();
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
