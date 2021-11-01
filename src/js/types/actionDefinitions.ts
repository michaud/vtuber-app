import { Action } from "./Action";
export interface ActionDefinition {
    updateName : string;
    action : Action;
}

export interface ActionDefinitionList {
    [index : string] : ActionDefinition
}
