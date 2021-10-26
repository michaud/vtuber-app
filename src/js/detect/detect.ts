import FaceGeometry from "face/FaceGeometry";
import { DetectUpdate } from "types/Detector";

const detect = (
    detectors : Array<DetectUpdate> = [],
    geom : FaceGeometry
) : Array<string> => {

    const detections : Array<string> = [];
    
    detectors.forEach(
        detector => detector(geom, detections)
    );

    return detections;
};

export default detect;
