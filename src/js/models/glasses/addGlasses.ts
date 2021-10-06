import actionDefinitions from './actionDefinitions';
import updateAction from './updateAction';
import addActions from '../addActions';

import loadModel from '../loadModel';
import { Object3D, Scene } from 'three';
import { Model } from '../../types/model';
import { Update } from '../../types/Action';

const addGlasses = (
    scene : Scene
) : Model => {

    const mesh : Array<Object3D> = [];
    const updateActions : Array<Update> = [];

    const create = () => {

        loadModel(
            'glasses.glb',
            gltf => {
                scene.add(gltf.scene);
                mesh.push(gltf.scene);
                updateActions.push(
                    updateAction(
                        updateActions,
                        mesh
                    )
                );
            }
        );
    };

    const update : Update = (geom, moment) : void => {

        if(mesh.length === 0) return;
        
        updateActions.map(action => action(geom, moment));
    };

    const { actions } = addActions(
        updateActions,
        mesh,
        actionDefinitions
    ); 

    return {
        create,
        update,
        name: 'glasses',
        actions,
        mesh
    }
};

export default addGlasses;