import models from "./models.js";
import addModelToUIList from "../addModelToUIList.js";

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

            const modelActionHandlers = Object
                .keys(model.actions)
                .reduce((acc, key) => ({
                    ...acc,
                    [key]: () => model.actions[key](threeTime)
                })
            );

        
            addModelToUIList(
                model,
                () => model.create(),
                modelActionHandlers
            );

            return model;
        }
);

export default addModels;
