import { Update } from "types/Update";
import { TrackData } from "types/TrackData";
import { Action } from "types/Action";

const updateAction : Action = (
    _updateList,
    { mesh }
) : Update => {

    const scale : number = 8;

    const update : Update = ({
        geom
    }) => {

        if(mesh.length === 0) return;

        const track : TrackData = geom.track(6, 196, 419);

        mesh[0].scale.setScalar(scale * track.scale);
        mesh[0].position.copy(track.position);
        mesh[0].rotation.setFromRotationMatrix(track.rotation);
    };

    return update;
};

export default updateAction;
