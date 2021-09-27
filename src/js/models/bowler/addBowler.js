import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { LoadingManager } from 'three';

import updateBowlerAction from './updateBowlerAction';
import bowlerActionDefinitions from './bowlerActionDefinitions';
import addActions from '../addActions';
import paths from '../../constants/paths';


const addBowler = (scene) => {

    const mesh =[];
    const updateActions = [];

    const create = () => {

        const gltfLoadmanager = new LoadingManager();

        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath(paths.decoder);

        const GLTFLoad = new GLTFLoader(gltfLoadmanager)
            .setPath(paths.models)
            .setDRACOLoader(dracoLoader);

        GLTFLoad.load(
            'bowler_hat.glb',
            gltf => {

                scene.add(gltf.scene);

                mesh.push(gltf.scene);

                updateActions.push(
                    updateBowlerAction(
                        updateActions,
                        mesh
                    )
                );
            }
        );
    };

    const update = (geom, moment) => {

        if(mesh.length === 0) return;
        
        updateActions.map(action => action(geom, moment));
    };

    const { actions } = addActions(
        updateActions,
        mesh,
        bowlerActionDefinitions
    ); 

    return {
        create,
        update,
        name: 'bowler',
        actions,
        mesh
    }
};

export default addBowler;
