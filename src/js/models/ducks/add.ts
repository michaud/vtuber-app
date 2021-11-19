import {
    AnimationAction,
    AnimationClip,
    LoopOnce,
    Object3D,
} from 'three';

import updateAction from './updateAction';
import actionDefinitions from './actionDefinitions';
import addActions from '../addActions';
import loadModel from '../loadModel';
import { Update } from 'types/Update';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import modelUpdate from '../modelUpdate';
import paths from 'constant/paths';
import { SceneCreator } from 'types/SceneCreator';
import { Model } from 'types/model';

const duckIds : Array<string> = ['000', '001', '002', '003', '004', '005', '006', '007'];

export const add : SceneCreator = (
    scene,
    mixer
) => {

    const updateActions : Array<Update> = [];
    const mesh : Array<Object3D> = [];
    const animations : Array<AnimationAction> = [];

    const model : Model = {
        create: null,
        update: modelUpdate(
            updateActions,
            { mesh }
        ),
        name: 'ducks',
        actions: {},
        mesh,
        active: false
    };

    model.create = () => {

        loadModel(
            'ducks.glb',
            paths.models,
            null,
            (gltf:GLTF) => {

                gltf.scene.name = model.name;
                
                scene.add(gltf.scene);
                mesh.push(gltf.scene);

                updateActions.push(
                    updateAction(
                        updateActions,
                        {
                            mesh
                        }
                    )
                );

                duckIds.forEach(
                    id => gltf.scene
                        .getObjectByName(`ducky${id}`)
                        .scale.setScalar(0)
                );

                updateActions.push(
                    updateAction(
                        updateActions,
                        { mesh }
                    )
                );

                gltf.animations.forEach((clip : AnimationClip) => {

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
                });

                model.active = true;
            }
        );
    };

    const { actions } = addActions({
            updateActions,
            mesh,
            animations
        },
        actionDefinitions
    ); 

    model.actions = actions;

    return model
};
