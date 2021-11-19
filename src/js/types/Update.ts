import FaceGeometry from "face/FaceGeometry";
import {
    BufferAttribute,
    Light
} from "three";

export interface UpdateResources {
    geom? : FaceGeometry,
    moment? : number,
    points? : BufferAttribute,
    normals? :  BufferAttribute,
    lights? : Array<Light>,
    resources?: object,
    timeStamp?: number
}

export type Update = (resources? : UpdateResources) => void;


