const duckStopAction = (
    actionList,
    _,
    animations
) => {

    const name = 'duckStopUpdate';

    const duckStopUpdate = (
        // geom,
        // moment
    ) => {

        animations.map(act => {

            const clip = act.getClip();

            if(clip.name === 'popup_action') {

                act.timeScale = -1;
                act.paused = false;
            }
    
            if(clip.name.includes('bubble')) {

                act.timeScale = -1;
                act.paused = false;
            }
    
            act.play();
        });

        /* remove yourself from the actionList */
        const idx = actionList.findIndex(item => item.name === name);
        actionList.splice(idx, 1);
    };

    return duckStopUpdate;
}

export default duckStopAction;
