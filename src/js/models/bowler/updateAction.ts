import { BufferAttribute, InterleavedBufferAttribute, Matrix4, Object3D, Vector3 } from "three";
import { FaceMeshFaceGeometry } from "./../../face/face";
import { UpdateAction } from "../../types/Action";
import { TrackData } from "../../types/TrackData";

const updateAction = (
    actionList : Array<UpdateAction>,
    mesh : Array<Object3D>
) => {

    const scale = 7;

    const update = (
        geom : FaceMeshFaceGeometry,
        moment : number
    ) => {

        if(mesh.length === 0) return;

        const points : BufferAttribute = geom.getAttribute('position') as BufferAttribute;
    
        const track : TrackData = geom.track(10, 108, 337);

        mesh[0].scale.setScalar(scale * track.scale);
        mesh[0].position.set(
            points.array[197 * 3],
            points.array[(197 * 3) + 1]-30,
            points.array[(197 * 3) + 2]
        );

        mesh[0].rotation.setFromRotationMatrix(track.rotation);
    }

    return update;
};

export default updateAction;
