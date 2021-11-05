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
import { AnimationAction, Light, Object3D } from "three";

const hasAction : HasAction = (
    actionName,
    updateActions
) => updateActions
    .findIndex((action : Update) => action.name === actionName) > -1;

const getAction : GetAction = (
    { updateName, action },
    updateActions,
    mesh,
    lights,
    animations?
) : VoidRunner => () : void => {

    !hasAction(updateName, updateActions) && 
    updateActions.push(action(
        updateActions,
        {
            mesh,
            lights,
            animations
        }
    )
)};

const addActions : AddActions = ({
        updateActions,
        mesh,
        lights,
        animations
    },
    actionDefinitions
) : ActionResources => {

    const actions : UpdateList = Object
        .keys(actionDefinitions)
        .reduce((acc, key) => {

        const action : ActionDefinition = actionDefinitions[key];

        return ({
            ...acc,
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
/* hmmm, this is good for readability but seems @nal */
type HasAction = (
    actionName : string,
    updateActions : Array<Update>
) => boolean;

type GetAction = (
    actionDefinition : ActionDefinition,
    updateActions : Array<Update>,
    mesh : Array<Object3D>,
    lights : Array<Light>,
    animations? : Array<AnimationAction>
) => VoidRunner

type AddActions = (
    modelResources : ModelResources,
    actionDefinitions : ActionDefinitionList
) => ActionResources

export default addActions;
