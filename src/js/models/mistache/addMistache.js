import updateMistacheAction from './updateMistacheAction';
import mistacheActionDefinitions from './mistacheActionDefinitions';
import addActions from '../addActions';
import loadModel from '../loadModel';

const addMistache = (scene) => {

    const mesh =[];
    const updateActions = [];

    const create = () => {

        loadModel(
            'mistache.glb',
            gltf => {

                scene.add(gltf.scene);

                mesh.push(gltf.scene);

                updateActions.push(
                    updateMistacheAction(
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
        mistacheActionDefinitions
    ); 

    return {
        create,
        update,
        name: 'mistache',
        actions,
        mesh
    }
};

export default addMistache;
