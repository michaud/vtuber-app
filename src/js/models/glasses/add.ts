import actionDefinitions from './actionDefinitions';
import updateAction from './updateAction';
import addActions from '../addActions';

import loadModel from '../loadModel';
import { Object3D } from 'three';
import { Update } from 'types/Update';
import modelUpdate from '../modelUpdate';
import paths from 'constant/paths';
import { SceneCreator } from 'types/SceneCreator';
import { Model } from 'types/model';

export const add : SceneCreator = (scene) => {

    const mesh : Array<Object3D> = [];
    const updateActions : Array<Update> = [];

    const model : Model = {
        create: null,
        update: modelUpdate(updateActions),
        name: 'glasses',
        actions:{},
        mesh,
        active: false,
        faceTrackindeces: [6, 196, 419]
    };

    model.create = () => {

        loadModel(
            'glasses.glb',
            paths.models,
            null,
            gltf => {

                gltf.scene.name = model.name;

                scene.add(gltf.scene);
                mesh.push(gltf.scene);
                updateActions.push(
                    updateAction(
                        updateActions,
                        { mesh }
                    )
                );
                model.active = true;
            }
        );
    };

    const { actions } = addActions({
            updateActions,
            mesh,
        },
        actionDefinitions
    ); 

    model.actions = actions;

    return model
};
