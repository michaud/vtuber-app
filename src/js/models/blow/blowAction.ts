import { Action } from "types/Action";
import { Update } from "types/Update";

const blowAction : Action = (
    updateList,
    { animations }
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
