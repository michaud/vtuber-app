import { AnimationAction, AnimationClip, Object3D } from "three";
import { UpdateAction } from "../../types/Action";

const duckStopAction = (
    actionList : UpdateAction[],
    mesh : Object3D[],
    animations : AnimationAction[]
) => {

    const name:string = 'duckStopUpdate';

    const duckStopUpdate = () => {

        animations.map(act => {

            const clip:AnimationClip = act.getClip();

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

        /* remove yourself from the actionList */
        const idx:number = actionList.findIndex(item => item.name === name);
        actionList.splice(idx, 1);
    };

    return duckStopUpdate;
}

export default duckStopAction;
