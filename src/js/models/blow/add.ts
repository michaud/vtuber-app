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
import blowDetectAction from './blowDetectAction';
import detectO from '../../detect/detectO';
import { Detector } from 'types/Detector';
import { Model } from 'types/model';

export const add : SceneCreator = (
    scene,
    mixer
) => {

    const updateActions : Array<Update> = [];
    const mesh : Array<Object3D> = [];
    const animations : Array<AnimationAction> = [];

    const detectors : Array<Detector> = [
        {
            detection : detectO,
            detectAction : blowDetectAction(animations)
        }
    ] 

    const model : Model = {
        create: null,
        update: modelUpdate(updateActions),
        name: 'blow',
        actions: {},
        mesh,
        detectors,
        active: false,
        faceTrackindeces: [13, 87, 317],
        scale: 9
    }

    model.create = () => {

        loadModel(
            'blow.glb',
            paths.models,
            null,
            (gltf:GLTF) => {

                gltf.scene.name = model.name;

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

    return model;
};
