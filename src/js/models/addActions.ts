import { AnimationAction, Object3D } from "three";
import { FaceMeshFaceGeometry } from "../face/face";
import {
    ActionDefinition,
    ActionDefinitions
} from "../types/actionDefinitions";
import {
    Update,
    UpdateList,
    ActionResources,
    Action
} from "../types/Action";
import { VoidRunner } from "../types/voidRunner";

const hasAction = (
    actionName : string,
    updateActions : Array<Update>
) : boolean => updateActions.indexOf((
    action : FaceMeshFaceGeometry
) => action.name === actionName) < 0;

const getAction = (
    { updateName, action } : { updateName : string, action : Action },
    updateActions : Array<Update>,
    mesh : Array<Object3D>,
    animations? : Array<AnimationAction>
) : VoidRunner => () : void => {

    //find type for action
    hasAction(updateName, updateActions) && 
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
