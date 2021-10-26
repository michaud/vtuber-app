import { VoidRunner } from "./voidRunner";
import { AnimationAction, Light, Object3D } from "three";

import { Detector } from "./Detector";
import { Update } from "./Update";

export interface Model {
    create : VoidRunner;
    update? : Update;
    name: string;
    actions?: {
        [index: string]: Update | Detector
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
