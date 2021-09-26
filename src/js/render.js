import updates from "./updates.js";
import detect from "./detect/detect.js";
import detectors from "./detect/detectors.js";

const render = async ({
    model,
    updateActions,
    controls,
    scene,
    mixer,
    faceGeometry,
    threeTime,
    renderer,
    camera,
    av,
    status
})=> {

    const flipCamera = true;

    const faces = await model.estimateFaces({
        input: av.video,
        flipHorizontal: flipCamera
    });

    status.textContent = "";

    const delta = threeTime.getDelta();
    mixer && mixer.update(delta);

    av.style.opacity = 1;
    status.textContent = "";

    // There's at least one face.
    if (faces.length > 0) {
        // Update face mesh geometry with new data.
        faceGeometry.update(faces[0], flipCamera);

        updates(
            updateActions,
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

    requestAnimationFrame(() => render({
        model,
        updateActions,
        controls,
        scene,
        mixer,
        faceGeometry,
        threeTime,
        renderer,
        camera,
        av,
        status
    }));
};

export default render;
