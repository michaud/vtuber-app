import { AnimationAction, Light, Object3D } from "three";
import {
    ActionDefinition,
    ActionDefinitionList
} from "types/actionDefinitions";
import {
    UpdateList,
    ActionResources
} from "types/Action";
import { VoidRunner } from "types/voidRunner";
import { Update } from "types/Update";
import { ModelResources } from "types/model";

const hasAction = (
    actionName : string,
    updateActions : Array<Update>
) : boolean => updateActions
    .findIndex((action : Update) => action.name === actionName) > -1;

const getAction = (
    { updateName, action } : ActionDefinition,
    updateActions : Array<Update>,
    mesh : Array<Object3D>,
    lights : Array<Light>,
    animations? : Array<AnimationAction>
) : VoidRunner => () : void => {

    !hasAction(updateName, updateActions) && 
    updateActions.push(action(
        updateActions,
        mesh,
        lights,
        animations
    )
)};

const addActions = ({
        updateActions,
        mesh,
        lights,
        animations
    }: ModelResources,
    actionDefinitions : ActionDefinitionList
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
                    lights,
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
