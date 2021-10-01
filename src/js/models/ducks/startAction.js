const startAction = (
    actionList,
    _,
    animations
) => {

    const name = 'duckStartUpdate';

    const duckStartUpdate = (
        // geom,
        // moment
    ) => {

        animations.map(act => {

            if(!act.isRunning()) {
                act.timeScale = 1;
                act.reset();
                act.play();
            }
        });

        /* remove yourself from the actionList */
        const idx = actionList.findIndex(item => item.name === name);
        actionList.splice(idx, 1);
    };

    return duckStartUpdate;
}

export default startAction;
