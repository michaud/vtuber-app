import updates from "./updates.js";
import detect from "../detect/detect.js";
import detectors from "../detect/detectors.js";

const updateWithFaceDetection = async (
    faceDetectionModel,
    av,
    flipCamera,
    faceGeometry,
    models,
    elapsedTime
) =>{

    const faces = await faceDetectionModel.estimateFaces({
        input: av.video,
        flipHorizontal: flipCamera
    });
    // There's at least one face.
    if (faces.length > 0) {
        // Update face mesh geometry with new data.
        faceGeometry.update(faces[0], flipCamera);

        updates(
            models,
            faceGeometry,
            elapsedTime,
            detect(
                detectors,
                faceGeometry
            )
        );
    }
}

export default updateWithFaceDetection;
