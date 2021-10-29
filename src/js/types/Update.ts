import FaceGeometry from "face/FaceGeometry";
import {
    BufferAttribute,
    Light
} from "three";

export type Update = (
    geom? : FaceGeometry,
    moment? : number,
    points? : BufferAttribute,
    normals? :  BufferAttribute,
    lights? : Array<Light>
) => void;

