import { verticalMapping } from "./verticalMapping.js";

const tdRevealAction = (
    actionList,
    mesh
) => {

    const name = 'tdRevealUpdate';
    let startReveal;
    const revealduration = 4;
    let revealInterval = revealduration / verticalMapping.length;
    let revealIndex = 0;

    const tdRevealUpdate = (
        _,
        moment
    ) => {

        if (!startReveal) {
            startReveal = moment;
            mesh.forEach(plane => plane.children[0].visible = false);
        }

        if (moment > startReveal + (revealIndex * revealInterval)) {

            verticalMapping[revealIndex].forEach(i => mesh[i].children[0].visible = true);

            if (revealIndex < verticalMapping.length - 1) {

                revealIndex++;

            } else {

                //reset
                startReveal = undefined;
                revealIndex = 0;
                mesh.forEach(plane => plane.children[0].visible = true);
                
                //remove yourself from the actionList
                const idx = actionList.findIndex(item => item.name === name);
                actionList.splice(idx, 1);
            }
        }
    };

    return tdRevealUpdate;
};

export default tdRevealAction;
