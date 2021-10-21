import { Object3D, Scene } from "three";
import { Update } from "types/Update";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import loadModel from "../../models/loadModel";
import paths from "constant/paths";

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
