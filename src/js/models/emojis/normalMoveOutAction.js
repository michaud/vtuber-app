import { Vector3 } from "three";
import appConstants from "../../constants/appConstants";

const normalMoveOutAction = (
    actionList,
    mesh
) => {

    const name = 'normalMoveOutUpdate';
    let start;
    const duration = 1;
    const steps = 20;
    let interval = duration / steps;
    let index = 0;

    const normalMoveOutUpdate = (
        geom,
        moment
    ) => {

        if (!start) {
            start = moment;
            index++;
        }

        const geomIndex = 1;

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
                
                /* remove yourself from the actionList */
                const idx = actionList.findIndex(item => item.name === name);
                actionList.splice(idx, 1);
            }
        }
    };

    return normalMoveOutUpdate;
};

export default normalMoveOutAction;
