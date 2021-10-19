import { Object3D } from "three";
import { Update } from "types/Update";
import { TrackData } from "types/TrackData";

const updateAction = (
    _updateList : Array<Update>,
    mesh : Array<Object3D>
) : Update => {

    const scale : number = 8;

    const update : Update = (
        geom,
        _moment,
        points
    ) => {

        if(mesh.length === 0) return;

        const track : TrackData = geom.track(6, 196, 419);

        mesh[0].scale.setScalar(scale * track.scale);
        mesh[0].position.copy(track.position);
        mesh[0].rotation.setFromRotationMatrix(track.rotation);
    };

    return update;
};

export default updateAction;
