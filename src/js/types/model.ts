import { VoidRunner } from "./voidRunner";
import { AnimationAction, Light, Object3D } from "three";

import { Update } from "types/Update";
import { DetectUpdate } from "types/Detector";
export interface Model {
    create : VoidRunner;
    update? : Update;
    name: string;
    actions?: {
        [index: string]: Update | DetectUpdate
    };
    mesh: Array<Object3D>,
    lights? : Array<Light>
};

export type ModelResources = {
    updateActions : Array<Update>,
    mesh? : Array<Object3D>,
    lights? : Array<Light>,
    animations? : Array<AnimationAction>
};
