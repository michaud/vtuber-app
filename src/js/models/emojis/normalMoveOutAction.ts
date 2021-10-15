import { Object3D, Vector3 } from "three";
import appConstants from "../../constants/appConstants";
import { Update } from "../../types/Action";

const normalMoveOutAction = (
    updateList : Array<Update>,
    mesh : Array<Object3D>
) : Update => {

    const name = 'normalMoveOutUpdate';
    let start : number;
    const duration = 1;
    const steps = 20;
    let interval = duration / steps;
    let index = 0;

    const normalMoveOutUpdate : Update = (
        geom,
        moment
    ) => {

        if (!start) {
            start = moment;
            index++;
        }

        const points = geom.getAttribute('position');
        const normals = geom.getAttribute('normal');

        if (moment > start + (index * interval)) {


            const delta = (index * interval) * 200;

            for (let i = 0; i < appConstants.NUM_KEYPOINTS; i++) {

                const point = new Vector3(
                    points.array[i * 3],
                    points.array[(i * 3) + 1],
                    points.array[(i * 3) + 2]
                );

                const vnormal = new Vector3(
                    normals.array[i * 3],
                    normals.array[(i * 3) + 1],
                    normals.array[(i * 3) + 2]
                );

                vnormal.negate();
                vnormal.multiplyScalar(delta);
                point.add(vnormal)

                geom.attributes.position.needsUpdate = true;
                mesh[i].position.set(point.x, point.y, point.z);
            }

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

    return normalMoveOutUpdate;
};

export default normalMoveOutAction;
