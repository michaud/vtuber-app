import { Light, Object3D } from "three";
import { ActionModelResources } from "types/Action";
import { Update } from "types/Update";

const toggleShowAction = (
    updateList : Array<Update>,
    {
        mesh,
        lights
    } : ActionModelResources
) : Update => {

    const name:string = 'toggleShowUpdate';

    const toggleShowUpdate = () : void => {

        mesh.forEach((el:Object3D) => el.visible = !el.visible);
        lights && lights.forEach(light => light.visible = !light.visible);
        /* remove yourself from the updateList */
        const idx : number = updateList.findIndex(
            (item : Update) => item.name === name
        );
        updateList.splice(idx, 1);
    };

    return toggleShowUpdate;
}

export default toggleShowAction;
