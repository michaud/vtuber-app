import { AnimationAction, Object3D } from "three";
import { UpdateAction } from "../../types/Action";

const startAction = (
    actionList : UpdateAction[],
    mesh : Object3D[],
    animations : AnimationAction[]
) => {

    const name : string = 'duckStartUpdate';

    const duckStartUpdate = () => {

        animations.map(act => {

            if(!act.isRunning()) {
                act.timeScale = 1;
                act.reset();
                act.play();
            }
        });

        /* remove yourself from the actionList */
        const idx:number = actionList.findIndex(item => item.name === name);
        actionList.splice(idx, 1);
    };

    return duckStartUpdate;
}

export default startAction;
