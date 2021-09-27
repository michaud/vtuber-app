import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';

export const getFaceDetection = async (onStartLoadModel) => {

    onStartLoadModel();

    const faceDetectionModel = await faceLandmarksDetection.load(
        faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
        { maxFaces: 1 }
    );

    return {
        faceDetectionModel
    };
};
