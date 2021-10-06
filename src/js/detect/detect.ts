import { FaceMeshFaceGeometry } from "../face/face";
import { Detector } from "../types/Detector";

const detect = (
    detectors : Array<Detector> = [],
    geom : FaceMeshFaceGeometry
) : Array<string> => {

    const detections : Array<string> = [];
    detectors.forEach(
        detector => detector(geom, detections)
    );

    return detections;
};

export default detect;
