import FaceGeometry from "face/FaceGeometry";
import { Detector } from "types/Detector";

const detect = (
    detectors : Array<Detector> = [],
    geom : FaceGeometry
) : Array<string> => {

    const detections : Array<string> = [];
    
    detectors.forEach(
        detector => detector(geom, detections)
    );

    return detections;
};

export default detect;
