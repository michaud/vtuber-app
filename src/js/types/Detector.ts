import FaceMeshFaceGeometry from "../face/FaceMeshFaceGeometry";

export type Detector = (
    geom? : FaceMeshFaceGeometry,
    detections? : Array<string>
) => void
