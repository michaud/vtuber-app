import { ActionModelResources } from "types/Action";
import { Update } from "types/Update";

const modelUpdate = (
    updateActions : Array<Update>,
    _: ActionModelResources
) : Update => (
    geom,
    moment,
    points,
    normals
) => updateActions.forEach((action : Update) => action(
    geom,
    moment,
    points,
    normals
));

export default modelUpdate;
