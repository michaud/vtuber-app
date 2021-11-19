import { Object3D, Scene } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import loadModel from "models/loadModel";
import paths from "constant/paths";

export const add = (scene : Scene) => {

    const mesh : Array<Object3D> =[];

    const model = {
        create: () => {},
        update: () => {},
        name: 'pointy background',
        actions: {},
        mesh,
        active: false
    };

    model.create = () => {

        loadModel(
            'pointy_background.glb',
            paths.stage,
            null,
            (gltf:GLTF) => {
                gltf.scene.name = model.name;
                gltf.scene.scale.setScalar(130);
                scene.add(gltf.scene);
                mesh.push(gltf.scene);
            }
        )
    };

    return model;
};
