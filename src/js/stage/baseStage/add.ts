import { Update } from "types/Update";
import addActions from "models/addActions";
import { Light, Object3D, Scene } from "three";
import actionDefinitions from './actionDefinitions'
import addLighting from './addLighting';
import modelUpdate from "models/modelUpdate";

export const add = (scene : Scene) => {

    const mesh : Array<Object3D> =[];
    const updateActions : Array<Update> = [];
    const lights : Array<Light> = [];

    const create = () => {

        addLighting(scene, lights);
    };

    const { actions } = addActions({
            updateActions,
            mesh,
            lights
        },
        actionDefinitions
    );

    return {
        create,
        update: modelUpdate(
            updateActions,
            {
                mesh,
                lights
            }
        ),
        name: 'baseStage',
        actions,
        mesh,
        lights
    }
};
