import { AnimationAction, BufferAttribute, Object3D } from "three";
import { FaceMeshFaceGeometry } from "../face/face";

export type Update = (
    geom? : FaceMeshFaceGeometry,
    moment? : number,
    points? : BufferAttribute,
    normals? :  BufferAttribute
) => void;

export type Action = (
    updateActions : Array<Update>,
    mesh : Array<Object3D>,
    animations? : Array<AnimationAction>
) => Update;

export interface UpdateList { [index : string] : Update }

export interface ActionResources {
    updateActions : Array<Update>,
    actions : UpdateList
}
