import { Object3D } from "three";
import { Update } from "types/Update";

const toggleShowAction = (
    updateList : Array<Update>,
    mesh : Array<Object3D>
) : Update => {

    const name:string = 'toggleShowUpdate';

    const toggleShowUpdate = () : void => {

        mesh.forEach((el:Object3D) => el.visible = !el.visible);

        /* remove yourself from the updateList */
        const idx : number = updateList.findIndex(
            (item : Update) => item.name === name
        );
        updateList.splice(idx, 1);
    };

    return toggleShowUpdate;
}

export default toggleShowAction;
