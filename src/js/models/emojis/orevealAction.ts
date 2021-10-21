import FaceGeometry from "face/FaceGeometry";
import { Object3D } from "three";
import { Update } from "types/Update";
import { circularMapping } from "./circularMapping";

const orevealAction = (
    updateList : Array<Update>,
    mesh : Array<Object3D>
) : Update => {

    const name = 'orevealUpdate';
    let startReveal : number;
    const revealduration = 1;
    let revealInterval = revealduration / circularMapping.length;
    let revealIndex = 0;

    const orevealUpdate : Update = (
        _geom : FaceGeometry,
        moment : number
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
                
                /* remove yourself from the updateList */
                const idx = updateList.findIndex(item => item.name === name);
                updateList.splice(idx, 1);
            }
        }
    };

    return orevealUpdate;
};

export default orevealAction;
