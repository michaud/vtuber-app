import { Update } from "types/Update";
import { TrackData } from "types/TrackData";
import { Action } from "types/Action";

const updateAction : Action = (
    _actionList,
    { mesh }
) : Update => {

    const scale = 9;

    const blowUpdate : Update = ({
        geom
    }) => {

        if(mesh.length === 0) return;

        const track : TrackData = geom.track(13, 87, 317);

        mesh[0].scale.setScalar(scale * track.scale);
        mesh[0].position.copy(track.position);

        mesh[0].rotation.setFromRotationMatrix(track.rotation);
    };

    return blowUpdate;
};

export default updateAction;
