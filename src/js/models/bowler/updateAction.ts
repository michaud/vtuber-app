import { Update } from "types/Update";
import { TrackData } from "types/TrackData";
import { Action } from "types/Action";

const updateAction : Action = (
    _actionList,
    { mesh }
) : Update => {

    const scale = 550;

    const update : Update = ({
        geom,
        faceTrackindeces
    }) => {

        if(mesh.length === 0) return;

        const track : TrackData = geom.track(
            faceTrackindeces[0],
            faceTrackindeces[1],
            faceTrackindeces[2]
        );

        mesh[0].scale.setScalar(scale * track.scale);
        mesh[0].position.copy(track.position);
        mesh[0].rotation.setFromRotationMatrix(track.rotation);
    }

    return update;
};

export default updateAction;
