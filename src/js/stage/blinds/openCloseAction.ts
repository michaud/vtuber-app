import {
    AnimationAction,
    AnimationClip,
    Object3D
} from "three";
import { Update } from "../../types/Action";

const openCloseAction = (
    updateList : Array<Update>,
    _mesh : Array<Object3D>,
    animations : Array<AnimationAction>
) => {

    const name:string = 'openCloseUpdate';

    const openCloseUpdate = () => {

        animations.map(act => {
        console.log('act:', act)

            act.paused = false;

            act.play();
            act.timeScale = -1;
        });

        /* remove yourself from the updateList */
        const idx : number = updateList.findIndex(item => item.name === name);
        updateList.splice(idx, 1);
    };

    return openCloseUpdate;
}

export default openCloseAction;
