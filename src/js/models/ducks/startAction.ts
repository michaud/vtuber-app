import { AnimationAction, Object3D } from "three";
import { ActionModelResources } from "types/Action";
import { Update } from "types/Update";

const startAction = (
    updateList : Array<Update>,
    {
        animations
    } : ActionModelResources
) => {

    const name : string = 'duckStartUpdate';

    const duckStartUpdate = () => {

        animations.forEach(act => {

            if(!act.isRunning()) {
                act.timeScale = 1;
                act.reset();
                act.play();
            }
        });

        /* remove yourself from the updateList */
        const idx : number = updateList.findIndex(item => item.name === name);
        updateList.splice(idx, 1);
    };

    return duckStartUpdate;
}

export default startAction;
