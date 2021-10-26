import FaceGeometry from "face/FaceGeometry";
import {
    AnimationMixer,
    Scene
} from "three";

import { Model } from "./model";

export type SceneCreator = (
    scene : Scene,
    mixer?: AnimationMixer,
    faceGeometry? : FaceGeometry
) => Model
