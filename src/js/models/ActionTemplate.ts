import { Object3D } from "three";
import { FaceMeshFaceGeometry } from "../face/face";
import { Update } from "../types/Action";

/* replace name and implement, maybe use different step definition */
const nameAction = (
    updateList : Array<Update>,
    mesh : Array<Object3D>
) : Update => {

    const name = 'nameUpdate';
    let start : number;
    const duration = 1;
    const steps = 30;
    let interval = duration / steps;
    let index = 0;

    const nameUpdate : Update = (
        geom : FaceMeshFaceGeometry,
        moment : number
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
                const idx : number = updateList.findIndex(item => item.name === name);
                updateList.splice(idx, 1);
            }
        }
    };

    return nameUpdate;
};

export default nameAction;
