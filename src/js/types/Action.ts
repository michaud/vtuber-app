import { AnimationAction, Object3D } from "three";
import { Update } from "./Update";

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
