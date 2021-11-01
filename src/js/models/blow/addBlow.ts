import { Update } from 'types/Update';
import {
    AnimationAction,
    AnimationClip,
    Group,
    LoopOnce,
    Object3D
} from 'three';
import updateAction from './updateAction';
import actionDefinitions from './actionDefinitions';
import addActions from '../addActions';
import loadModel from '../loadModel';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import modelUpdate from '../modelUpdate';
import paths from 'constant/paths';
import { SceneCreator } from 'types/SceneCreator';

const addBlow : SceneCreator = (
    scene,
    mixer
) => {

    const updateActions : Array<Update> = [];
    const mesh : Array<Object3D> = [];
    const animations : Array<AnimationAction> = [];
    const name = 'blow';

    const create = () => {

        loadModel(
            'blow.glb',
            paths.models,
            (gltf:GLTF) => {

                gltf.scene.name = name;

                scene.add(gltf.scene);

                const blow : Group = gltf.scene

                mesh.push(blow);

                gltf.animations.forEach((clip:AnimationClip) => {
                    const anim : AnimationAction = mixer.clipAction(clip);
                    anim.clampWhenFinished = true;
                    anim.setLoop(LoopOnce, 1);
                    animations.push(anim);
                });

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
            animations
        },
        actionDefinitions
    );
    
    return {
        create,
        update: modelUpdate(
            updateActions,
            { mesh }),
        name,
        actions,
        mesh
    };
};

export default addBlow;
