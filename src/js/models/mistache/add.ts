import updateAction from './updateAction';
import actionDefinitions from './actionDefinitions';
import addActions from '../addActions';
import loadModel from '../loadModel';
import { Object3D } from 'three';
import { Update } from 'types/Update';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import modelUpdate from '../modelUpdate';
import paths from 'constant/paths';
import { SceneCreator } from 'types/SceneCreator';
import { Model } from 'types/model';

export const add : SceneCreator = (scene) => {

    const mesh : Array<Object3D> =[];
    const updateActions : Array<Update> = [];

    const model : Model = {
        create: null,
        update: modelUpdate(
            updateActions,
            { mesh }
        ),
        name: 'mistache',
        actions: {},
        mesh,
        active: false
    };

    model.create = () => {

        loadModel(
            'mistache.glb',
            paths.models,
            null,
            (gltf:GLTF) => {

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
            mesh
        },
        actionDefinitions
    ); 
    
    model.actions = actions;

    return model
};
