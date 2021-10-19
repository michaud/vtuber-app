import { BufferAttribute } from "three";
import FaceMeshFaceGeometry from "../face/FaceMeshFaceGeometry";

export type Update = (
    geom? : FaceMeshFaceGeometry,
    moment? : number,
    points? : BufferAttribute,
    normals? :  BufferAttribute
) => void;

