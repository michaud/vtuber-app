import {
    AnimationAction,
    AnimationClip,
    Object3D
} from "three";
import { Update } from "types/Update";

const openCloseAction = (
    updateList : Array<Update>,
    _mesh : Array<Object3D>,
    animations : Array<AnimationAction>
) => {

    const name:string = 'openCloseUpdate';

    const openCloseUpdate = () => {

        animations.forEach(act => {

            if(!act.isRunning()) {

                act.paused = false;
                act.timeScale = act.timeScale * -1;
                act.play();
            }
        });

        /* remove yourself from the updateList */
        const idx : number = updateList.findIndex(item => item.name === name);
        updateList.splice(idx, 1);
    };

    return openCloseUpdate;
}

export default openCloseAction;
