import { LoopOnce } from 'three';

import updateAction from './updateAction';
import actionDefinitions from './actionDefinitions';
import addActions from '../addActions';
import loadModel from '../loadModel';

const duckIds = ['000', '001', '002', '003', '004', '005', '006', '007'];

const addDucks = (scene, mixer) => {

    const mesh = [];
    const updateActions = [];
    const animations = [];

    const create = () => {

        loadModel(
            'ducks.glb',
            gltf => {
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

                    const anim = mixer.clipAction(clip);

                    if(clip.name === 'popup_action') {
                        anim.clampWhenFinished = true;
                        anim.setLoop(LoopOnce);
                    }

                    if(clip.name.includes('bubble')) {
                        anim.clampWhenFinished = true;
                        anim.setLoop(LoopOnce);
                    }

                    animations.push(anim);
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
        actionDefinitions,
        animations
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
