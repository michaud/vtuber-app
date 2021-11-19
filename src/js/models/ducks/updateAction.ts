import { Update } from "types/Update";
import { TrackData } from "types/TrackData";
import { Action } from "types/Action";

const updateDuckAction : Action = (
    _updateList,
    { mesh }
) : Update => {

    const scale : number = 9;

    const update : Update = ({
        geom
    }) => {

        if(mesh.length === 0) return;

        const track : TrackData = geom.track(6, 196, 419);

        const adjustedScale : number = scale * track.scale;

        mesh[0].scale.setScalar(adjustedScale);
        mesh[0].position.copy(track.position);
        mesh[0].rotation.setFromRotationMatrix(track.rotation);
    };

    return update;
};

export default updateDuckAction;
