const normalMoveAction = (
    actionList,
    mesh
) => {

    const name = 'nameUpdate';
    let start;
    const duration = 1;
    const steps = 30;
    let interval = duration / steps;
    let index = 0;

    const normalMoveUpdate = (
        geom,
        moment
    ) => {

        if (!start) {
            start = moment;
            index++;
        }

        if (moment > start + (index * interval)) {

            //implement

            if (index < steps) {

                index++;

            } else {

                /* reset */
                start = undefined;
                index = 0;
                
                /* remove yourself from the actionList */
                const idx = actionList.findIndex(item => item.name === name);
                actionList.splice(idx, 1);
            }
        }
    };

    return normalMoveUpdate;
};

export default normalMoveAction;
