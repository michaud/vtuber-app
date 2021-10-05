import { AnimationAction, Object3D } from "three";
import { FaceMeshFaceGeometry } from "../face/face";
import { Model } from "./model";

export type UpdateAction = (
    geom? : FaceMeshFaceGeometry,
    moment? : number
) => void;

export type Action = (
    updateActions : UpdateAction[],
    mesh : Object3D[],
    animations? : AnimationAction[]
) => UpdateAction;

export type ActionList = { [index : string] : UpdateAction }

export type ActionResources = {
    updateActions : UpdateAction[],
    actions : ActionList
}
