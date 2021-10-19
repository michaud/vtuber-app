import { AnimationAction, Object3D } from "three";
import {
    ActionDefinition,
    ActionDefinitions
} from "types/actionDefinitions";
import {
    UpdateList,
    ActionResources
} from "types/Action";
import { VoidRunner } from "types/voidRunner";
import { Update } from "types/Update";

const hasAction = (
    actionName : string,
    updateActions : Array<Update>
) : boolean => updateActions
    .findIndex((action : Update) => action.name === actionName) > -1;

const getAction = (
    { updateName, action } : ActionDefinition,
    updateActions : Array<Update>,
    mesh : Array<Object3D>,
    animations? : Array<AnimationAction>
) : VoidRunner => () : void => {

    !hasAction(updateName, updateActions) && 
    updateActions.push(action(
        updateActions,
        mesh,
        animations
    )
)};

const addActions = (
    updateActions : Array<Update>,
    mesh : Array<Object3D>,
    actionDefinitions : ActionDefinitions,
    animations? : Array<AnimationAction>
) : ActionResources => {

    const actions : UpdateList = Object
        .keys(actionDefinitions)
        .reduce((acc, key) => {

            const action : ActionDefinition = actionDefinitions[key];

            const detections = action?.detections ? {
                detections: action.detections(animations)
            } : {};

            return ({
                ...acc,
                ...detections,
                [key]: getAction(
                    action,
                    updateActions,
                    mesh,
                    animations
                )
            })
    }
    , {})

    return {
        updateActions,
        actions
    }
};

export default addActions;
