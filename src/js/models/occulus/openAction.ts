import { Action } from "types/Action";

const openAction : Action = (
    updateList,
    { animations }
) => {

    const name : string = 'occulusOpenUpdate';

    const occulusOpenUpdate = () => {

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

    return occulusOpenUpdate;
}

export default openAction;
