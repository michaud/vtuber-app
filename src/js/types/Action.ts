import { AnimationAction, Object3D } from "three";
import { FaceMeshFaceGeometry } from "../face/face";
import { Model } from "./model";

export type UpdateAction = (
    geom? : FaceMeshFaceGeometry,
    moment? : number
) => void;

export type Action = (
    updateActions : Array<UpdateAction>,
    mesh : Array<Object3D>,
    animations? : Array<AnimationAction>
) => UpdateAction;

export type ActionList = { [index : string] : UpdateAction }

export type ActionResources = {
    updateActions : Array<UpdateAction>,
    actions : ActionList
}
