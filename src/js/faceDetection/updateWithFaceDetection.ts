import { Model } from "types/model";
import {
    AnnotatedPrediction,
    MediaPipeFaceMesh
} from "@tensorflow-models/face-landmarks-detection/dist/mediapipe-facemesh";
import updates from "../render/updates";
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

    faceDetectionModel
        .estimateFaces({
            input: av.video,
            flipHorizontal: flipCamera
        }).then((faces) => {

            /* There's at least one face. */
            if (faces.length > 0) {

                /* Update face mesh geometry with new data. */
                faceGeometry.update(faces[0], flipCamera);
            }
        });

    updates(
        models,
        stages,
        faceGeometry,
        elapsedTime
    );
}

export default updateWithFaceDetection;
