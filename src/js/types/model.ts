import { VoidRunner } from "./voidRunner";
import { FaceMeshFaceGeometry } from "../face/face.js";
import { Object3D } from "three";

export type Model = {
    create : VoidRunner;
    update : (geom : FaceMeshFaceGeometry, moment : number) => void;
    name: string;
    actions: {
        [index: string]: (geom : FaceMeshFaceGeometry, moment : number) => void
    };
    mesh: Array<Object3D>
};
