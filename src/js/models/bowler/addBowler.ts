import updateAction from './updateAction';
import actionDefinitions from './actionDefinitions';
import addActions from '../addActions';
import loadModel from '../loadModel';
import { Object3D, Scene } from 'three';
import { Update } from 'types/Update';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { Model } from 'types/model';
import modelUpdate from '../modelUpdate';
import paths from 'constant/paths';

const addBowler = (
    scene:Scene
) : Model => {

    const updateActions : Array<Update> = [];
    const mesh : Array<Object3D> = [];

    const create = () => {

        loadModel(
            'bowler_hat.glb',
            paths.models,
            (gltf:GLTF) => {

                scene.add(gltf.scene);

                mesh.push(gltf.scene);

                updateActions.push(
                    updateAction(
                        updateActions,
                        mesh
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
        update: modelUpdate({
            mesh,
            updateActions
        }),
        name: 'bowler',
        actions,
        mesh
    }
};

export default addBowler;
