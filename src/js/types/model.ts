import { VoidRunner } from "./voidRunner";
import { Object3D } from "three";

import { Detector } from "./Detector";
import { Update } from "./Update";

export interface Model {
    create : VoidRunner;
    update? : Update;
    name: string;
    actions?: {
        [index: string]: Update | Detector
    };
    mesh: Array<Object3D>
};
