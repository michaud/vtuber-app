
import { Detector } from "types/Detector";
import FaceMeshFaceGeometry from "../face/FaceMeshFaceGeometry";

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
