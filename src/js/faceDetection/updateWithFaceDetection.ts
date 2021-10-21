import updates from "../render/updates";
import detect from "../detect/detect";
import detectors from "../detect/detectors";
import { AnnotatedPrediction, MediaPipeFaceMesh } from "@tensorflow-models/face-landmarks-detection/dist/mediapipe-facemesh";
import { Model } from "types/model";
import FaceGeometry from "face/FaceGeometry";
import { GumAudioVideo } from "thirdparty/gum-av";

const updateWithFaceDetection = async (
    faceDetectionModel : MediaPipeFaceMesh,
    av : GumAudioVideo,
    flipCamera : boolean,
    faceGeometry : FaceGeometry,
    models : Array<Model>,
    stages: Array<Model>,
    elapsedTime : number
) : Promise<void> => {

    const faces : Array<AnnotatedPrediction> = await faceDetectionModel.estimateFaces({
        input: av.video,
        flipHorizontal: flipCamera
    });
    /* There's at least one face. */
    if (faces.length > 0) {

        /* Update face mesh geometry with new data. */
        faceGeometry.update(faces[0], flipCamera);

        updates(
            models,
            stages,
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
