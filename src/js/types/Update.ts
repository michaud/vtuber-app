import FaceGeometry from "face/FaceGeometry";
import {
    BufferAttribute,
    Light
} from "three";
import { ActionModelResources } from "./Action";

export interface StepUpdateResources {
    geom? : FaceGeometry,
    moment? : number,
    points? : BufferAttribute,
    normals? :  BufferAttribute,
    timeStamp?: number,
}

export type UpdateResources = StepUpdateResources & ActionModelResources

export type Update = (resources? : UpdateResources) => void;
