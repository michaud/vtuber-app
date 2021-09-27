import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';

export const getPredictions = async (status) => {

    status.textContent = "Loading model...";

    const faceDetectionModel = await faceLandmarksDetection.load(
        faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
        { maxFaces: 1 }
    );

    status.textContent = "Detecting face...";

    return {
        faceDetectionModel
    };
};
