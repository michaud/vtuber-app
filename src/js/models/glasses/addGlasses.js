import glassesActionDefinitions from './glassesActionDefinitions';
import updateGlassesAction from './updateGlassesAction';
import addActions from '../addActions';

import loadModel from '../loadModel';

const addGlasses = (scene) => {

    const mesh = [];
    const updateActions = [];

    const create = () => {

        loadModel(
            'glasses.glb',
            gltf => {
                scene.add(gltf.scene);
                mesh.push(gltf.scene);
                updateActions.push(
                    updateGlassesAction(
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
        glassesActionDefinitions
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
