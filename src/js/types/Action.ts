import { AnimationAction, Object3D } from "three";
import { FaceMeshFaceGeometry } from "../face/face";

export type Update = (
    geom? : FaceMeshFaceGeometry,
    moment? : number
) => void;

export type Action = (
    updateActions : Array<Update>,
    mesh : Array<Object3D>,
    animations? : Array<AnimationAction>
) => Update;

export interface ActionList { [index : string] : Update }

export interface ActionResources {
    updateActions : Array<Update>,
    actions : ActionList
}
