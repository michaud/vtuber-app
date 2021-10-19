
import {
    AnimationMixer,
    Scene
} from "three";
import FaceMeshFaceGeometry from "../face/FaceMeshFaceGeometry";

import { Model } from "./model";

export type SceneCreator = (
    scene : Scene,
    _mixer: AnimationMixer,
    faceGeometry? : FaceMeshFaceGeometry
) => Model
