import actionDefinitions from './actionDefinitions';
import updateAction from './updateAction';
import addActions from '../addActions';

import loadModel from '../loadModel';
import { Object3D, Scene } from 'three';
import { Model } from 'types/model';
import { Update } from 'types/Update';
import modelUpdate from '../modelUpdate';
import paths from 'constant/paths';

const addGlasses = (
    scene : Scene
) : Model => {

    const mesh : Array<Object3D> = [];
    const updateActions : Array<Update> = [];
    const name = 'glasses';

    const create = () => {

        loadModel(
            'glasses.glb',
            paths.models,
            gltf => {

                gltf.scene.name = name;

                scene.add(gltf.scene);
                mesh.push(gltf.scene);
                updateActions.push(
                    updateAction(
                        updateActions,
                        { mesh }
                    )
                );
            }
        );
    };

    const { actions } = addActions({
            updateActions,
            mesh,
        },
        actionDefinitions
    ); 

    return {
        create,
        update: modelUpdate(
            updateActions,
            { mesh }
        ),
        name,
        actions,
        mesh
    }
};

export default addGlasses;
