import models from "./models.js";

const addModels = (
    scene,
    mixer,
    faceGeometry
    ) => models.map(
        add => {

            const model = add(
                scene,
                mixer,
                faceGeometry
            );

            return model;
        }
);

export default addModels;
