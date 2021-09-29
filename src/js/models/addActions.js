const hasAction = (actionName, updateActions) => updateActions
    .indexOf(action => action.name === actionName) < 0;

const getAction = (
    { update, action },
    updateActions,
    mesh,
    animations
) => () => hasAction(update, updateActions) && 
    updateActions.push(action(
        updateActions,
        mesh,
        animations
    )
);

const addActions = (
    updateActions,
    mesh,
    actionDefinitions,
    animations
) => {

    const actions = Object
        .keys(actionDefinitions)
        .reduce((acc, key) => {

            const action = actionDefinitions[key];

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
