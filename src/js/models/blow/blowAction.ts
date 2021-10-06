import { AnimationAction, Object3D } from "three";
import { UpdateAction } from "../../types/Action";

const blowAction = (
    actionList : Array<UpdateAction>,
    mesh : Array<Object3D>,
    animations : Array<AnimationAction>
) : UpdateAction => {

    const name = 'blowUpdate';

    const blowUpdate = (
        // geom,
        // moment
    ) => {

        if(animations.length === 0) return;

        animations.map(act => {

            if(!act.isRunning()) {
                act.reset();
                act.play();
            }
        });

        /* remove yourself from the actionList */
        const idx = actionList.findIndex(item => item.name === name);
        actionList.splice(idx, 1);
    };

    return blowUpdate;
};

export default blowAction;
