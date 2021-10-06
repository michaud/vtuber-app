/* replace name and implement, maybe use different step definition */
const nameAction = (
    updateList,
    mesh
) => {

    const name = 'nameUpdate';
    let start;
    const duration = 1;
    const steps = 30;
    let interval = duration / steps;
    let index = 0;

    const nameUpdate = (
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
                
                /* remove yourself from the updateList */
                const idx = updateList.findIndex(item => item.name === name);
                updateList.splice(idx, 1);
            }
        }
    };

    return nameUpdate;
};

export default nameAction;
