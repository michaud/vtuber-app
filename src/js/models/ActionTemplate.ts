import { Update } from "types/Update";
import FaceGeometry from "face/FaceGeometry";
import { Object3D } from "three";


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

    const nameUpdate : Update = ({
        geom,
        moment
    }) => {

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
