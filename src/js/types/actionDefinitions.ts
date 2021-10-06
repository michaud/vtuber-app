import { AnimationAction } from "three";
import { Action } from "./Action";

export interface ActionDefinition {
    update : string;
    action : Action;
    detections? : (animations : Array<AnimationAction>) => (detections : Array<string>) => void
}

export interface ActionDefinitions {
    [index : string] : ActionDefinition
}
