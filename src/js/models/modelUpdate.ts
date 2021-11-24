import { Update } from "types/Update";

const modelUpdate = (
    updateActions : Array<Update>
) : Update => (resources) => updateActions
    .forEach((action : Update) => action(resources));

export default modelUpdate;
