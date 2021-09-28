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
    let onFirstFaceDetection = onFirstFaceDetect;

    const rerender = async ()=> {

        /* execute once */
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

        //renderer.render(scene, camera);
        composer.render();
        requestAnimationFrame(() => rerender());

        /* execute once */
        if(onInitialize) {
            onInitialize();
            onInitialize = undefined;   
        }
    };

    return rerender;
};

export default render;
