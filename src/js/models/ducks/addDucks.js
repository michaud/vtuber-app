import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import {
    LoadingManager,
    LoopOnce
} from 'three';

import updateDuckAction from './updateDuckAction';
import duckActionDefinitions from './duckActionDefinitions';
import addActions from '../addActions';
import paths from '../../paths';

const duckIds = ['000', '001', '002', '003', '004', '005', '006', '007'];

const addDucks = (scene, mixer) => {

    const mesh = [];
    const updateActions = [];
    const duckAnimations = [];

    const create = () => {

        const gltfLoadmanager = new LoadingManager();

        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath(paths.decoder);

        const GLTFLoad = new GLTFLoader(gltfLoadmanager)
            .setPath(paths.models)
            .setDRACOLoader(dracoLoader);

        GLTFLoad.load(
            'ducks.glb',
            gltf => {
                scene.add(gltf.scene);
                mesh.push(gltf.scene);

                updateActions.push(
                    updateDuckAction(
                        updateActions,
                        mesh
                    )
                );

                duckIds.map(
                    id => gltf.scene
                        .getObjectByName(`ducky${id}`)
                        .scale.setScalar(0)
                );

                updateActions.push(
                    updateDuckAction(
                        updateActions,
                        mesh
                    )
                );

                gltf.animations.map(clip => {

                    const anim = mixer.clipAction(clip);

                    if(clip.name === 'popup_action') {
                        anim.clampWhenFinished = true;
                        anim.setLoop(LoopOnce);
                    }

                    if(clip.name.includes('bubble')) {
                        anim.clampWhenFinished = true;
                        anim.setLoop(LoopOnce);
                    }

                    duckAnimations.push(anim);
                })
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
        duckActionDefinitions,
        duckAnimations
    ); 

    return {
        create,
        update,
        name: 'ducks',
        actions,
        mesh
    }
};

export default addDucks;
