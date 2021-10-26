import { Object3D } from "three";
import { Update } from "types/Update";
import { TrackData } from "types/TrackData";

const updateDuckAction = (
    _updateList : Array<Update>,
    mesh : Array<Object3D>
) : Update => {

    const scale : number = 9;

    const update : Update = (
        geom
    ) => {

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
