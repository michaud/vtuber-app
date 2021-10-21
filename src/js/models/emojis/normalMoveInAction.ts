import { Update } from "types/Update";
import { Object3D, Vector3 } from "three";
import FaceMeshFaceGeometry from "../../face/FaceMeshFaceGeometry";
import { appConstants } from "constant/appConstants";

const normalMoveInAction = (
    updateList : Array<Update>,
    mesh : Array<Object3D>
) : Update => {

    const name = 'normalMoveInUpdate';
    let start : number;
    const duration = 1;
    const steps = 20;
    let interval = duration / steps;
    let index = 0;

    const normalMoveInUpdate : Update = (
        geom : FaceMeshFaceGeometry,
        moment : number
    ) => {

        if (!start) {
            start = moment;
            index++;
        }

        const points = geom.getAttribute('position');
        const normals = geom.getAttribute('normal');

        if (moment > start + (index * interval)) {

            const delta : number = (index * interval) * 200;

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

                //vnormal.negate();
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
                const idx : number = updateList.findIndex(item => item.name === name);
                updateList.splice(idx, 1);
            }
        }
    };

    return normalMoveInUpdate;
};

export default normalMoveInAction;
