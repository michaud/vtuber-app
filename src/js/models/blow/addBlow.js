import { LoopOnce } from 'three';

import updateBlowAction from './updateBlowAction';
import blowActionDefinitions from './blowActionDefinitions';
import addActions from '../addActions';
import loadModel from '../loadModel';

const addBlow = (scene, mixer) => {

    const mesh =[];
    const updateActions = [];
    const animations = [];

    const create = () => {

        loadModel(
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
