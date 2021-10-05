import { FaceMeshFaceGeometry } from "../face/face";
import { Detector } from "../types/Detector";

const detect = (
    detectors : Detector[] = [],
    geom : FaceMeshFaceGeometry
):string[] => {

    const detections : string[] = [];
    detectors.forEach(
        detector => detector(geom, detections)
    );

    return detections;
};

export default detect;
