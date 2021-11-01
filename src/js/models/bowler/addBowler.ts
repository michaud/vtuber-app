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

const addBowler : SceneCreator = (scene) => {

    const updateActions : Array<Update> = [];
    const mesh : Array<Object3D> = [];
    const name = 'bowler';

    const create = () => {

        loadModel(
            'bowler_hat.glb',
            paths.models,
            (gltf:GLTF) => {

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
        name: 'bowler',
        actions,
        mesh
    }
};

export default addBowler;
