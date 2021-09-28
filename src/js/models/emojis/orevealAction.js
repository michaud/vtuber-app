import { circularMapping } from "./circularMapping";

const orevealAction = (
    actionList,
    mesh
) => {

    const name = 'orevealUpdate';
    let startReveal;
    const revealduration = 1;
    let revealInterval = revealduration / circularMapping.length;
    let revealIndex = 0;

    const orevealUpdate = (
        _,
        moment
    ) => {

        if (!startReveal) {
            startReveal = moment;
            mesh.forEach(plane => plane.visible = false);
            revealIndex++;
        }

        if (moment > startReveal + (revealIndex * revealInterval)) {

            circularMapping[revealIndex].forEach(i => mesh[i].visible = true);

            if (revealIndex < circularMapping.length - 1) {

                revealIndex++;

            } else {

                /* reset */
                startReveal = undefined;
                revealIndex = 0;
                mesh.forEach(plane => plane.visible = true);
                
                /* remove yourself from the actionList */
                const idx = actionList.findIndex(item => item.name === name);
                actionList.splice(idx, 1);
            }
        }
    };

    return orevealUpdate;
};

export default orevealAction;
