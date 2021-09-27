import { Vector3 } from 'three';
import appConstants from '../../constants/appConstants.js';


const updateEmojisAction = (
    _,
    mesh
) => {

    const scale = 8;

    const emojisUpdate = (
        geom,
        // moment
    ) => {

        const points = geom.getAttribute('position');
        const normals = geom.getAttribute('normal');
        const track = geom.track(6, 196, 419);

        for (let i = 0; i < appConstants.NUM_KEYPOINTS; i++) {

            mesh[i].position.set(
                points.array[i * 3],
                points.array[(i * 3) + 1],
                points.array[(i * 3) + 2]
            );

            const pos = new Vector3(
                points.array[i * 3],
                points.array[(i * 3) + 1],
                points.array[(i * 3) + 2]
            );

            const norm = new Vector3(
                normals.array[i * 3],
                normals.array[(i * 3) + 1],
                normals.array[(i * 3) + 2]
            );

            norm.add(pos);
            geom.attributes.position.needsUpdate = true;
            mesh[i].scale.setScalar(scale * track.scale);
            mesh[i].lookAt(norm);
        }
    };

    return emojisUpdate;
};

export default updateEmojisAction;
