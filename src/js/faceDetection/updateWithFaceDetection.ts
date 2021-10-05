import updates from "../render/updates";
import detect from "../detect/detect";
import detectors from "../detect/detectors";
import { AnnotatedPrediction, MediaPipeFaceMesh } from "@tensorflow-models/face-landmarks-detection/dist/mediapipe-facemesh";
import { FaceMeshFaceGeometry } from "../face/face";
import { Model } from "../types/model";

const updateWithFaceDetection = async (
    faceDetectionModel : MediaPipeFaceMesh,
    av : GumAudioVideo,
    flipCamera : boolean,
    faceGeometry : FaceMeshFaceGeometry,
    models : Model[],
    elapsedTime : number
) : Promise<void> => {

    const faces : AnnotatedPrediction[] = await faceDetectionModel.estimateFaces({
        input: av.video,
        flipHorizontal: flipCamera
    });
    /* There's at least one face. */
    if (faces.length > 0) {

        /* Update face mesh geometry with new data. */
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
