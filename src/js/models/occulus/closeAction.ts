import { Action } from "types/Action";

const occulusCloseAction : Action = (
    updateList,
    { animations }
) => {

    const name:string = 'occulusCloseUpdate';

    const occulusCloseUpdate = () => {

        animations.forEach(act => {

            act.timeScale = -1;
            act.paused = false;
    
            act.play();
        });

        /* remove yourself from the updateList */
        const idx : number = updateList.findIndex(item => item.name === name);
        updateList.splice(idx, 1);
    };

    return occulusCloseUpdate;
}

export default occulusCloseAction;
