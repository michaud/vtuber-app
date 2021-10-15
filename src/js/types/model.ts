import { VoidRunner } from "./voidRunner";
import { FaceMeshFaceGeometry } from "../face/face.js";
import { Object3D } from "three";
import { Update } from "./Action";
import { Detector } from "./Detector";

export interface Model {
    create : VoidRunner;
    update : Update;
    name: string;
    actions: {
        [index: string]: Update | Detector
    };
    mesh: Array<Object3D>
};
