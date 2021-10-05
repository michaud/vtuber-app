import { AnimationAction } from "three";
import { UpdateAction } from "./UpdateAction";

export type ActionDefinition = {
    update:string;
    action:UpdateAction;
    detections?: (animations:AnimationAction[]) => (detections:[]) => void
}

export type ActionDefinitions = {
    [index:string]: ActionDefinition
}
