import updates from "./updates.js";
import detect from "./detect/detect.js";
import detectors from "./detect/detectors.js";

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

        onFirstFaceDetection && onFirstFaceDetection();
        onFirstFaceDetection = undefined;

        const faces = await faceDetectionModel.estimateFaces({
            input: av.video,
            flipHorizontal: flipCamera
        });

        const delta = threeTime.getDelta();
        mixer && mixer.update(delta);

        // There's at least one face.
        if (faces.length > 0) {
            // Update face mesh geometry with new data.
            faceGeometry.update(faces[0], flipCamera);

            updates(
                models,
                faceGeometry,
                threeTime.elapsedTime,
                detect(
                    detectors,
                    faceGeometry
                )
            );
        }

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

        onInitialize && onInitialize();
        onInitialize = undefined;
    };

    return rerender;
};

export default render;
