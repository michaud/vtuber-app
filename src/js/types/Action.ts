import {
    AnimationAction,
    Light,
    Object3D
} from "three";
import { Update } from "./Update";

export interface ActionModelResources {
    mesh? : Array<Object3D>,
    lights? : Array<Light>,
    animations? : Array<AnimationAction>
};

export type Action = (
    updateActions : Array<Update>,
    resources: ActionModelResources
) => Update;

export interface UpdateList { [index : string] : Update }

export interface ActionResources {
    updateActions : Array<Update>,
    actions : UpdateList
}
