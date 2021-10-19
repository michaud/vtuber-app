import { Object3D, Scene } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import paths from "../../constants/paths";
import loadModel from "../../models/loadModel";
import { Update } from "../../types/Action";


const addBackground = (scene : Scene) => {

    const mesh : Array<Object3D> =[];
    const updateActions : Array<Update> = [];

    const create = () => {

        loadModel(
            'pointy_background.glb',
            paths.stage,
            (gltf:GLTF) => {

                gltf.scene.scale.setScalar(130);
                scene.add(gltf.scene);
                mesh.push(gltf.scene);
            }
        )
    };

    return {
        create,
        update: () => {},
        name: 'pointy background',
        actions: {},
        mesh
    }
};

export default addBackground;
