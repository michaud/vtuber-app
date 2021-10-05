import * as fld from '@tensorflow-models/face-landmarks-detection';
import { MediaPipeFaceMesh } from '@tensorflow-models/face-landmarks-detection/dist/mediapipe-facemesh';

const getFaceDetection = async (onStartLoadModel):Promise<MediaPipeFaceMesh> => {

    onStartLoadModel();

    const faceDetectionModel:MediaPipeFaceMesh = await fld.load(
        fld.SupportedPackages.mediapipeFacemesh,
        { maxFaces: 1 }
    );

    return faceDetectionModel
};

export default getFaceDetection;
