import { Action } from "types/Action";

const startAction : Action = (
    updateList,
    { animations }
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
