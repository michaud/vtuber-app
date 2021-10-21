import FaceGeometry from "face/FaceGeometry";

export type Detector = (
    geom? : FaceGeometry,
    detections? : Array<string>
) => void
