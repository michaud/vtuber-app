import updateWithFaceDetection from "./updateWithFaceDetection";

const render = (onInit, onFirstFaceDetect) => {

    const flipCamera = true;
    let onInitialize = onInit;
    let onFirstFaceDetection = onFirstFaceDetect;

    const rerender = async ({
        faceDetectionModel,
        models,
        controls,
        scene,
        mixer,
        faceGeometry,
        threeTime,
        renderer,
        camera,
        av
    })=> {

        if(onFirstFaceDetection) {
            onFirstFaceDetection();
            onFirstFaceDetection = undefined;
        } 

        
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

        renderer.render(scene, camera);

        requestAnimationFrame(() => rerender({
            faceDetectionModel,
            models,
            controls,
            scene,
            mixer,
            faceGeometry,
            threeTime,
            renderer,
            camera,
            av
        }));

        if(onInitialize) {
            onInitialize();
            onInitialize = undefined;   
        }
    };

    return rerender;
};

export default render;
