import FaceGeometry from "face/FaceGeometry";
import { AnimationAction } from "three";

export type DetectUpdate = (
    geom? : FaceGeometry,
    detections? : Array<string>
) => void

export type DetectAction = (
    animations : Array<AnimationAction>
) => DetectUpdate
