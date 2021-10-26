import { Action } from "./Action";
import { DetectAction, DetectUpdate } from "./Detector";

export interface ActionDefinition {
    updateName : string;
    action : Action;
    detectAction? : DetectAction
    //(animations : Array<AnimationAction>) => (detections : Array<string>) => void
}

export interface ActionDefinitionList {
    [index : string] : ActionDefinition
}
