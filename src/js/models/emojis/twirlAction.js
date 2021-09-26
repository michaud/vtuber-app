const twirlAction = (
    actionList,
    mesh
) => {

    const name = 'twirlUpdate';
    let start;
    const duration = 1;
    const steps = 10;
    let interval = duration / steps;
    let stepIndex = 0;
    const geomIndex = Math.floor(Math.random() * 468);
    let oriScale;

    const twirlUpdate = (
        _,
        moment
    ) => {

        if (!start) {
            start = moment;
            oriScale = mesh[geomIndex].children[0].scale.clone();
        }

        mesh[geomIndex].children[0].scale.setScalar(3);

        if (moment > start + (stepIndex * interval)) {

            mesh[geomIndex].children[0].rotation.set(0, ((2*Math.PI) / steps) * stepIndex, 0, 'XYZ');

            if (stepIndex < steps) {

                stepIndex++;

            } else {

                //reset
                start = undefined;
                stepIndex = 0;
                
                //remove yourself from the actionList
                const idx = actionList.findIndex(item => item.name === name);
                mesh[geomIndex].children[0].scale.set(oriScale.x, oriScale.y, oriScale.z);
                actionList.splice(idx, 1);
            }
        }
    };

    return twirlUpdate;
};

export default twirlAction;
