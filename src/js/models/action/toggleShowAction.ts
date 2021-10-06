import { Object3D } from "three";
import { UpdateAction } from "../../types/Action";

const toggleShowAction = (
    actionList : Array<UpdateAction>,
    mesh : Array<Object3D>
) : UpdateAction => {

    const name:string = 'toggleShowUpdate';

    const toggleShowUpdate = () : void => {

        mesh.forEach((el:Object3D) => el.visible = !el.visible);

        /* remove yourself from the actionList */
        const idx : number = actionList.findIndex(
            (item : UpdateAction) => item.name === name
        );
        actionList.splice(idx, 1);
    };

    return toggleShowUpdate;
}

export default toggleShowAction;
