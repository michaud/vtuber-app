const toggleShowAction = (
    actionList,
    mesh
) => {

    const name = 'toggleShowUpdate';

    const toggleShowUpdate = (
        // geom,
        // moment
    ) => {

        if(mesh.length === 1) mesh[0].visible = !mesh[0].visible;

        //remove yourself from the actionList
        const idx = actionList.findIndex(item => item.name === name);
        actionList.splice(idx, 1);
    };

    return toggleShowUpdate;
}

export default toggleShowAction;
