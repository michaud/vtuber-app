import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { LoadingManager } from 'three';
import glassesActionDefinitions from './glassesActionDefinitions';
import updateGlassesAction from './updateGlassesAction';
import addActions from '../addActions';
import paths from '../../paths';

const addGlasses = (scene) => {

    const mesh = [];
    const updateActions = [];

    const create = () => {

        const gltfLoadmanager = new LoadingManager();

        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath(paths.decoder);

        const GLTFLoad = new GLTFLoader(gltfLoadmanager)
            .setPath(paths.models)
            .setDRACOLoader(dracoLoader);

        GLTFLoad.load(
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
