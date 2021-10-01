import {
    MeshStandardMaterial,
    IcosahedronGeometry,
    Mesh
} from 'three';

import addActions from '../addActions';
import actionDefinitions from './actionDefinitions';
import updateAction from './updateAction';

const addNose = (scene) => {

    const mesh = [];
    const updateActions = [];

    const create = () => {

        // Create a red material for the nose.
        const noseMaterial = new MeshStandardMaterial({
            color: 0xff2010,
            roughness: 0.4,
            metalness: 0.1,
            transparent: true,
        });

        const noseMesh = new Mesh(new IcosahedronGeometry(1, 3), noseMaterial);
        noseMesh.castShadow = mesh.receiveShadow = true;
        scene.add(noseMesh);
        mesh.push(noseMesh);

        updateActions.push(
            updateAction(
                updateActions,
                mesh
            )
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
        name: 'nose',
        mesh,
        actions
    };
};

export default addNose;
