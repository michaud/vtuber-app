import updateAction from './updateAction';
import actionDefinitions from './actionDefinitions';
import addActions from '../addActions';
import loadModel from '../loadModel';
import { Object3D, Scene } from 'three';
import { UpdateAction } from '../../types/Action';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { FaceMeshFaceGeometry } from '../../face/face';
import { Model } from '../../types/model';

const addBowler = (
    scene:Scene
) : Model => {

    const updateActions : UpdateAction[] = [];
    const mesh : Object3D[] =[];

    const create = () => {

        loadModel(
            'bowler_hat.glb',
            (gltf:GLTF) => {

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

    const update = (
        geom:FaceMeshFaceGeometry,
        moment:number
    ) : void => {

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
