import { Update } from "types/Update";
import { TrackData } from "types/TrackData";
import { Action } from "types/Action";

const updateAction : Action = (
    _updateList,
    { mesh }
) : Update => {

    const scale : number = 15;

    const update : Update = (
        geom
    ) => {

        if(mesh.length === 0) return;

        /* Modify nose position and orientation. */
        const track : TrackData = geom.track(5, 45, 275);

        mesh[0].position.copy(track.position);
        mesh[0].rotation.setFromRotationMatrix(track.rotation);
        mesh[0].scale.setScalar(scale * track.scale);
    }

    return update;
};

export default updateAction;
