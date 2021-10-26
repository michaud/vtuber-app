import { Object3D } from "three";
import { ActionModelResources } from "types/Action";
import { Update } from "types/Update";

import { verticalMapping } from "./verticalMapping";

const tdRevealAction = (
    updateList : Array<Update>,
    {
        mesh
    } : ActionModelResources
) : Update => {

    const name = 'tdRevealUpdate';
    let startReveal : number;
    const revealduration = 4;
    let revealInterval : number = revealduration / verticalMapping.length;
    let revealIndex : number = 0;

    const tdRevealUpdate : Update = (
        _geom,
        moment : number
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
                
                /* remove yourself from the updateList */
                const idx : number = updateList.findIndex(item => item.name === name);
                updateList.splice(idx, 1);
            }
        }
    };

    return tdRevealUpdate;
};

export default tdRevealAction;
