import { AnimationAction } from "three";
import { Action } from "./Action";

export interface ActionDefinition {
    updateName : string;
    action : Action;
    detections? : (animations : Array<AnimationAction>) => (detections : Array<string>) => void
}

export interface ActionDefinitionList {
    [index : string] : ActionDefinition
}
