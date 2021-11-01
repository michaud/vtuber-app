import FaceGeometry from "face/FaceGeometry";
import { AnimationAction } from "three";

export type DetectUpdate = (
    geom? : FaceGeometry,
    detection? : string
) => void

export type DetectorUpdate = (
    geom? : FaceGeometry,
    detection? : string
) => string

export type DetectAction = (
    animations : Array<AnimationAction>
) => DetectUpdate

export type Detector = {
    detection: DetectorUpdate,
    detectAction: DetectUpdate
}
