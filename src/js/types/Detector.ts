import { FaceMeshFaceGeometry } from "../face/face";

export type Detector = (
    geom? : FaceMeshFaceGeometry,
    detections? : Array<string>
) => void
