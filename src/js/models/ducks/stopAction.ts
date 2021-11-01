import { Action } from "types/Action";
import {
    AnimationClip
} from "three";

const duckStopAction : Action = (
    updateList,
    { animations }
) => {

    const name:string = 'duckStopUpdate';

    const duckStopUpdate = () => {

        animations.forEach(act => {

            const clip : AnimationClip = act.getClip();

            if(clip.name === 'popup_action') {

                act.timeScale = -1;
                act.paused = false;
            }
    
            if(clip.name.includes('bubble')) {

                act.timeScale = -1;
                act.paused = false;
            }
    
            act.play();
        });

        /* remove yourself from the updateList */
        const idx : number = updateList.findIndex(item => item.name === name);
        updateList.splice(idx, 1);
    };

    return duckStopUpdate;
}

export default duckStopAction;
