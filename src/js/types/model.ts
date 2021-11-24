import { Update } from "types/Update";
import { Detector } from "types/Detector";
import { VoidRunner } from "./voidRunner";
import { ActionUpdate } from "./Action";
import {
    AnimationAction,
    Light,
    Object3D
} from "three";
export interface Model {
    create : VoidRunner | null
    mesh: Array<Object3D>
    name: string
    active : boolean
    update? : Update
    actions?: ActionUpdate
    lights? : Array<Light>
    detectors?: Array<Detector>
    progress?: number
    faceTrackindeces?: Array<number>
    scale?: number
};

export type ModelResources = {
    updateActions : Array<Update>
    mesh? : Array<Object3D>
    lights? : Array<Light>
    animations? : Array<AnimationAction>
};
