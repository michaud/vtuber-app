import updateAction from './updateAction';
import actionDefinitions from './actionDefinitions';
import addActions from '../addActions';
import loadModel from '../loadModel';

const addBowler = (scene) => {

    const mesh =[];
    const updateActions = [];

    const create = () => {

        loadModel(
            'bowler_hat.glb',
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

    const update = (geom, moment) => {

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
        name: 'bowler',
        actions,
        mesh
    }
};

export default addBowler;
