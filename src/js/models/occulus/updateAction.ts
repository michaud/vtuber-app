import { Update } from "types/Update";
import { TrackData } from "types/TrackData";
import { Action } from "types/Action";

const updateOcculusAction : Action = (
    _updateList,
    {
        mesh
    }
) : Update => {

    const update : Update = ({
        geom,
        faceTrackindeces,
        scale
    }) => {

        if(mesh.length === 0) return;

        const [one, two, three] = faceTrackindeces;

        const track : TrackData = geom.track(one, two, three);

        const adjustedScale : number = scale * track.scale;

        mesh[0].scale.setScalar(adjustedScale);
        mesh[0].position.copy(track.position);
        mesh[0].rotation.setFromRotationMatrix(track.rotation);
    };

    return update;
};

export default updateOcculusAction;
