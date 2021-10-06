import { VoidRunner } from "./voidRunner";
import { FaceMeshFaceGeometry } from "../face/face.js";
import { Object3D } from "three";
import { Update } from "./Action";

export interface Model {
    create : VoidRunner;
    update : Update;
    name: string;
    actions: {
        [index: string]: Update
    };
    mesh: Array<Object3D>
};
