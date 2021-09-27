import models from "./models.js";

const addModels = (
    scene,
    mixer,
    faceGeometry,
    threeTime,
    renderer,
    camera
    ) => models.map(
        add => {

            const model = add(
                scene,
                mixer,
                faceGeometry,
                renderer,
                camera,
            );

            return model;
        }
);

export default addModels;
