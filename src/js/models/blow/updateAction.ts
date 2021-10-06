import { BufferAttribute, Object3D } from "three";
import { FaceMeshFaceGeometry } from "./../../face/face";
import { Update } from "../../types/Action";

const updateAction = (
    _actionList : Array<Update>,
    mesh : Array<Object3D>
) : Update => {

    const scale = 9;

    const blowUpdate : Update = (
        geom : FaceMeshFaceGeometry
    ) => {

        if(mesh.length === 0) return;

        const points:BufferAttribute = geom.getAttribute('position') as BufferAttribute;
        const track = geom.track(6, 196, 419);

        mesh[0].scale.setScalar(scale * track.scale);
        mesh[0].position.set(
            points.array[197 * 3],
            points.array[(197 * 3) + 1],
            points.array[(197 * 3) + 2]
        );

        mesh[0].rotation.setFromRotationMatrix(track.rotation);
    };

    return blowUpdate;
};

export default updateAction;
