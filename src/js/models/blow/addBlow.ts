import {
    AnimationAction,
    AnimationClip,
    AnimationMixer,
    LoopOnce,
    Scene
} from 'three';

import updateAction from './updateAction';
import actionDefinitions from './actionDefinitions';
import addActions from '../addActions';
import loadModel from '../loadModel';
import { Model } from '../../types/model';
import { FaceMeshFaceGeometry } from '../../face/face';
import { UpdateAction } from '../../types/UpdateAction';

const addBlow = (
    scene:Scene,
    mixer:AnimationMixer,
    faceGeometry?:FaceMeshFaceGeometry
):Model => {

    const mesh:Model[] = [];
    const updateActions:UpdateAction[] = [];
    const animations:AnimationAction[] = [];

    const create = () => {

        loadModel(
            'blow.glb',
            gltf => {
                scene.add(gltf.scene);
                const blow = gltf.scene;
                mesh.push(blow);

                gltf.animations.map((clip:AnimationClip) => {
                    const anim:AnimationAction = mixer.clipAction(clip);
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

    const update = (
        geom:FaceMeshFaceGeometry,
        moment:number
    ):void => {

        if(mesh.length === 0) return;
        
        updateActions.map((action:UpdateAction) => action(geom, moment));
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
    }
};

export default addBlow;
