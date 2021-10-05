import { AnimationAction } from "three";
import { Action } from "./Action";

export type ActionDefinition = {
    update : string;
    action : Action;
    detections? : (animations : AnimationAction[]) => (detections : []) => void
}

export type ActionDefinitions = {
    [index : string] : ActionDefinition
}
