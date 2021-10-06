import { AnimationAction, AnimationClip, AnimationMixer, LoopOnce, Object3D, Scene } from 'three';

import updateAction from './updateAction';
import actionDefinitions from './actionDefinitions';
import addActions from '../addActions';
import loadModel from '../loadModel';
import { Update } from '../../types/Action';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import modelUpdate from '../modelUpdate';

const duckIds : Array<string> = ['000', '001', '002', '003', '004', '005', '006', '007'];

const addDucks = (
    scene : Scene,
    mixer : AnimationMixer
) => {

    const updateActions : Array<Update> = [];
    const mesh : Array<Object3D> = [];
    const animations : Array<AnimationAction> = [];

    const create = () => {

        loadModel(
            'ducks.glb',
            (gltf:GLTF) => {

                scene.add(gltf.scene);
                mesh.push(gltf.scene);

                updateActions.push(
                    updateAction(
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
                    updateAction(
                        updateActions,
                        mesh
                    )
                );

                gltf.animations.map(clip => {

                    const anim : AnimationAction = mixer.clipAction(clip);

                    if(clip.name === 'popup_action') {
                        anim.clampWhenFinished = true;
                        anim.setLoop(LoopOnce, 1);
                    }

                    if(clip.name.includes('bubble')) {
                        anim.clampWhenFinished = true;
                        anim.setLoop(LoopOnce, 1);
                    }

                    animations.push(anim);
                })
            }
        );
    };

    const { actions } = addActions(
        updateActions,
        mesh,
        actionDefinitions,
        animations
    ); 

    return {
        create,
        update: modelUpdate(
            mesh,
            updateActions
        ),
        name: 'ducks',
        actions,
        mesh
    }
};

export default addDucks;
