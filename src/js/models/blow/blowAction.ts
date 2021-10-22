import { AnimationAction, Object3D } from "three";
import { Update } from "types/Update";

const blowAction = (
    updateList : Array<Update>,
    _mesh : Array<Object3D>,
    animations : Array<AnimationAction>
) : Update => {

    const name = 'blowUpdate';

    const blowUpdate : Update = () => {

        if(animations.length === 0) return;

        animations.forEach(act => {

            if(!act.isRunning()) {
                act.reset();
                act.play();
            }
        });

        /* remove yourself from the updateList */
        const idx = updateList.findIndex(item => item.name === name);
        updateList.splice(idx, 1);
    };

    return blowUpdate;
};

export default blowAction;
