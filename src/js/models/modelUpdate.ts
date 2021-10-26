import { ActionModelResources } from "types/Action";
import { Update } from "types/Update";

const modelUpdate = (
    updateActions : Array<Update>,
    { mesh }: ActionModelResources
) : Update => {

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
