import { AnimationAction } from "three";
import { FaceMeshFaceGeometry } from "../face/face";
import { ActionDefinition, ActionDefinitions } from "../types/actionDefinitions";
import { Model } from "../types/model";
import { UpdateAction, ActionList, ActionResources } from "../types/UpdateAction";

const hasAction = (
    actionName:string,
    updateActions:UpdateAction[]
):boolean => updateActions.indexOf((
    action:FaceMeshFaceGeometry
) => action.name === actionName) < 0;

const getAction = (
    { update, action }:{ update:string, action },
    updateActions:UpdateAction[],
    mesh:Model[],
    animations:AnimationAction[]
) => () => {
    //find type for action
    hasAction(update, updateActions) && 
    updateActions.push(action(
        updateActions,
        mesh,
        animations
    )
)};

const addActions = (
    updateActions:UpdateAction[],
    mesh:Model[],
    actionDefinitions:ActionDefinitions,
    animations:AnimationAction[]
):ActionResources => {

    const actions:ActionList = Object
        .keys(actionDefinitions)
        .reduce((acc, key) => {

            const action:ActionDefinition = actionDefinitions[key];

            return ({
                ...acc,
                detections: action.detections ?
                action.detections(animations) :
                action.detections,
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
