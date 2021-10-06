import { MediaPipeFaceMesh } from "@tensorflow-models/face-landmarks-detection/dist/mediapipe-facemesh";
import { AppResources } from "./AppResources";

export interface AllResources extends AppResources {
    faceDetectionModel : MediaPipeFaceMesh
};
