import { Light, Object3D } from "three";
import { ModelResources } from "types/model";
import { Update } from "types/Update";

const modelUpdate = ({
    mesh,
    lights,
    updateActions
}: ModelResources) : Update => {

    const update : Update = (
        geom,
        moment,
        points,
        normals
    ) => {
    
        if(mesh.length === 0) return;
        
        updateActions.forEach((action : Update) => action(
            geom,
            moment,
            points,
            normals
        ));
    };

    return update;
}   

export default modelUpdate;
