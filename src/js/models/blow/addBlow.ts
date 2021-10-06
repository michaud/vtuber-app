import {
    AnimationAction,
    AnimationClip,
    AnimationMixer,
    Group,
    LoopOnce,
    Object3D,
    Scene
} from 'three';

import updateAction from './updateAction';
import actionDefinitions from './actionDefinitions';
import addActions from '../addActions';
import loadModel from '../loadModel';
import { Model } from '../../types/model';
import { FaceMeshFaceGeometry } from '../../face/face';
import { Update } from '../../types/Action';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

const addBlow = (
    scene : Scene,
    mixer : AnimationMixer
) : Model => {

    const updateActions : Array<Update> = [];
    const mesh : Array<Object3D> = [];
    const animations : Array<AnimationAction> = [];

    const create = () => {

        loadModel(
            'blow.glb',
            (gltf:GLTF) => {

                scene.add(gltf.scene);

                const blow : Group = gltf.scene

                mesh.push(blow);

                gltf.animations.map((clip:AnimationClip) => {
                    const anim : AnimationAction = mixer.clipAction(clip);
                    animations.push(anim);
                    anim.clampWhenFinished = true;
                    anim.setLoop(LoopOnce, 1);
                });

                updateActions.push(
                    updateAction(
                        updateActions,
                        mesh
                    )
                );
            }
        );
    };

    const update : Update = (
        geom : FaceMeshFaceGeometry,
        moment : number
    ) : void => {

        if(mesh.length === 0) return;
        
        updateActions.map((action : Update) => action(geom, moment));
    };

    const { actions } = addActions(
        updateActions,
        mesh,
        actionDefinitions,
        animations
    );
    
    return {
        create,
        update,
        name: 'blow',
        actions,
        mesh
    };
};

export default addBlow;
