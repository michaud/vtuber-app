import { BufferAttribute, Object3D } from "three";
import { FaceMeshFaceGeometry } from "../../face/face";
import { Update } from "../../types/Action";
import { TrackData } from "../../types/TrackData";

const updateAction = (
    _updateList : Array<Update>,
    mesh : Array<Object3D>
) : Update => {

    const scale : number = 7;

    const update : Update = (
        geom : FaceMeshFaceGeometry
    ) => {

        if(mesh.length === 0) return;

        const points : BufferAttribute = geom.getAttribute('position') as BufferAttribute;
        const track : TrackData = geom.track(164, 267, 37);

        mesh[0].scale.setScalar(scale * track.scale);
        mesh[0].position.set(
            points.array[0 * 3],
            points.array[(0 * 3) + 1],
            points.array[(0 * 3) + 2]
        );

        mesh[0].rotation.setFromRotationMatrix(track.rotation);
    }

    return update;
};

export default updateAction;
