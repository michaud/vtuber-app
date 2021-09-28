import models from "./models.js";

const addModels = (
    scene,
    mixer,
    faceGeometry,
    autoLoad
) => models.map(
    add => {

        const model = add(
            scene,
            mixer,
            faceGeometry
        );
        if(autoLoad.includes(model.name)) model.create();

        return model;
    }
);

export default addModels;
