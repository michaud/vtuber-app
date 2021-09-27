import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import {
    LoadingManager,
    LoopOnce
} from 'three';

import updateBlowAction from './updateBlowAction';
import blowActionDefinitions from './blowActionDefinitions';
import addActions from '../addActions';
import paths from '../../constants/paths';

const addBlow = (scene, mixer) => {

    const mesh =[];
    const updateActions = [];
    const animations = [];

    const create = () => {

        const gltfLoadmanager = new LoadingManager();
        // ./node_modules/three/examples/js/libs/draco/draco_wasm_wrapper.js
        // ./node_modules/three/examples/js/libs/draco/draco_decoder.wasm
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath(paths.decoder);

        const GLTFLoad = new GLTFLoader(gltfLoadmanager)
            .setPath(paths.models)
            .setDRACOLoader(dracoLoader);

        GLTFLoad.load(
            'blow.glb',
            gltf => {
                scene.add(gltf.scene);
                const blow = gltf.scene;
                mesh.push(blow);

                gltf.animations.map(clip => {
                    const anim = mixer.clipAction(clip);
                    animations.push(anim);
                    anim.clampWhenFinished = true;
                    anim.setLoop(LoopOnce);
                });

                updateActions.push(
                    updateBlowAction(
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
        blowActionDefinitions,
        animations
    );
    
    return {
        create,
        update,
        name: 'blow',
        actions,
        mesh
    }
};

export default addBlow;
