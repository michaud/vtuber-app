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

const addMistache = (
    scene : Scene
) : Model => {

    const mesh : Array<Object3D> =[];
    const updateActions : Array<Update> = [];
    const name = 'mistache';

    const create = () => {

        loadModel(
            'mistache.glb',
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
            mesh
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

export default addMistache;
