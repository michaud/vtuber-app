import {
    MeshStandardMaterial,
    IcosahedronGeometry,
    Mesh,
    Object3D
} from 'three';
import { Model } from 'types/model';

import { SceneCreator } from 'types/SceneCreator';
import { Update } from 'types/Update';

import addActions from '../addActions';
import modelUpdate from '../modelUpdate';
import actionDefinitions from './actionDefinitions';
import updateAction from './updateAction';

export const add : SceneCreator = (scene) => {

    const mesh : Array<Object3D> = [];
    const updateActions : Array<Update> = [];

    const model : Model = {
        create : null,
        update: modelUpdate(
            updateActions,
            { mesh }
        ),
        name: 'nose',
        mesh,
        actions: {},
        active: false
    }

    model.create = () => {

        // Create a red material for the nose.
        const noseMaterial = new MeshStandardMaterial({
            color: 0xff2010,
            roughness: 0.4,
            metalness: 0.1,
            transparent: true,
        });

        const noseMesh = new Mesh(new IcosahedronGeometry(1, 3), noseMaterial);
        noseMesh.name = model.name;
        noseMesh.castShadow = true;
        noseMesh.receiveShadow = true;
        
        scene.add(noseMesh);
        mesh.push(noseMesh);

        updateActions.push(
            updateAction(
                updateActions,
                { mesh }
            )
        );

        model.active = true;
    };

    const { actions } = addActions({
            updateActions,
            mesh
        },
        actionDefinitions
    );

    model.actions = actions;

    return model;
};
