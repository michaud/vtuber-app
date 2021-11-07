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

export const add = (scene: Scene) => {

    const mesh: Array<Object3D> = [];
    const updateActions: Array<Update> = [];
    const lights: Array<Light> = [];

    const model = {
        create: () => {},
        update: modelUpdate(
            updateActions,
            {
                mesh,
                lights
            }
        ),
        name: 'baseStage',
        actions: {},
        mesh,
        lights,
        active: false
    };

    model.create = () => {

        const group = new Group();
        group.name = model.name;

        addLighting(group, scene, lights);

        model.active = true;
    };

    const { actions } = addActions({
            updateActions,
            mesh,
            lights
        },
        actionDefinitions
    );

    model.actions = actions;

    return model;
};
