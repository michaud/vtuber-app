import { Update } from "types/Update";
import {
    Group,
    Light,
    Object3D,
    Scene
} from "three";
import addActions from "models/addActions";
import actionDefinitions from './actionDefinitions'
import addLighting from './addLighting';
import modelUpdate from "models/modelUpdate";

export const add = (scene : Scene) => {

    const mesh : Array<Object3D> =[];
    const updateActions : Array<Update> = [];
    const lights : Array<Light> = [];
    const name = 'baseStage';

    const create = () => {

        const group = new Group();
        group.name = name;
    
        addLighting(group, scene, lights);
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
        name,
        actions,
        mesh,
        lights
    }
};
