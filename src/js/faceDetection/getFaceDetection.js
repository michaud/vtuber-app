import * as fld from '@tensorflow-models/face-landmarks-detection';

const getFaceDetection = async (onStartLoadModel) => {

    onStartLoadModel();

    const faceDetectionModel = await fld.load(
        fld.SupportedPackages.mediapipeFacemesh,
        { maxFaces: 1 }
    );

    return {
        faceDetectionModel
    };
};

export default getFaceDetection;
