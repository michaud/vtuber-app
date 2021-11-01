import { Update } from "types/Update";
import { TrackData } from "types/TrackData";
import { Action } from "types/Action";

const updateAction : Action = (
    _actionList,
    { mesh }
) : Update => {

    const scale = 550;

    const update : Update = (
        geom,
        _moment
    ) => {

        if(mesh.length === 0) return;

        const track : TrackData = geom.track(10, 108, 337);

        mesh[0].scale.setScalar(scale * track.scale);
        mesh[0].position.copy(track.position);
        mesh[0].rotation.setFromRotationMatrix(track.rotation);
    }

    return update;
};

export default updateAction;
