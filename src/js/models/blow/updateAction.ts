import { Update } from "types/Update";
import { TrackData } from "types/TrackData";
import { Action } from "types/Action";

const updateAction : Action = (
    _actionList,
    { 
        mesh
    }
) : Update => {

    const blowUpdate : Update = ({
        geom,
        faceTrackindeces,
        scale
    }) => {

        if(mesh.length === 0) return;

        const [one, two, three] = faceTrackindeces;

        const track : TrackData = geom.track(one, two, three);

        mesh[0].scale.setScalar(scale * track.scale);
        mesh[0].position.copy(track.position);

        mesh[0].rotation.setFromRotationMatrix(track.rotation);
    };

    return blowUpdate;
};

export default updateAction;
