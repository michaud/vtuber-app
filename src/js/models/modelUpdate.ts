import { Object3D } from "three";
import { Update } from "../types/Action";

const modelUpdate = (
    mesh: Array<Object3D>,
    updateActions: Array<Update>
) : Update => {

    const update : Update = (
        geom,
        moment,
        points,
        normals
    ) => {
    
        if(mesh.length === 0) return;
        
        updateActions.map((action : Update) => action(
            geom,
            moment,
            points,
            normals
        ));
    };

    return update;
}   

export default modelUpdate;
