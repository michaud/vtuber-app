import { Object3D } from "three";
import { Update } from "../../types/Action";

const toggleShowAction = (
    actionList : Array<Update>,
    mesh : Array<Object3D>
) : Update => {

    const name:string = 'toggleShowUpdate';

    const toggleShowUpdate = () : void => {

        mesh.forEach((el:Object3D) => el.visible = !el.visible);

        /* remove yourself from the actionList */
        const idx : number = actionList.findIndex(
            (item : Update) => item.name === name
        );
        actionList.splice(idx, 1);
    };

    return toggleShowUpdate;
}

export default toggleShowAction;
