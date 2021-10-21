import FaceGeometry from "face/FaceGeometry";
import { BufferAttribute } from "three";

export type Update = (
    geom? : FaceGeometry,
    moment? : number,
    points? : BufferAttribute,
    normals? :  BufferAttribute
) => void;

