import { Object3D } from "three";
import { Update } from "../../types/Action";
import { TrackData } from "../../types/TrackData";

const updateAction = (
    _actionList : Array<Update>,
    mesh : Array<Object3D>
) : Update => {

    const scale = 9;

    const blowUpdate : Update = (
        geom
    ) => {

        if(mesh.length === 0) return;

        const track : TrackData = geom.track(13, 87, 317);

        mesh[0].scale.setScalar(scale * track.scale);
        mesh[0].position.copy(track.position);

        mesh[0].rotation.setFromRotationMatrix(track.rotation);
    };

    return blowUpdate;
};

export default updateAction;
