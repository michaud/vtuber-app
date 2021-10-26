import { Object3D } from "three";
import { Update } from "types/Update";
import { TrackData } from "types/TrackData";
import { ActionModelResources } from "types/Action";

const updateAction = (
    _updateList : Array<Update>,
    {
        mesh
    } : ActionModelResources
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
