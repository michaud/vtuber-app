import { AnimationAction, Object3D } from "three";
import { Update } from "../../types/Action";

const startAction = (
    updateList : Array<Update>,
    mesh : Array<Object3D>,
    animations : Array<AnimationAction>
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

        /* remove yourself from the updateList */
        const idx : number = updateList.findIndex(item => item.name === name);
        updateList.splice(idx, 1);
    };

    return duckStartUpdate;
}

export default startAction;
