import {
    AmbientLight,
    AnimationAction,
    Light,
    Object3D,
    PointLight,
    Scene,
    Vector3
} from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import addActions from "models/addActions";
import actionDefinitions from "./actionDefinitions";
import loadModel from "models/loadModel";
import { Update } from "types/Update";
import modelUpdate from "models/modelUpdate";
import paths from "constant/paths";
import { Model } from "types/model";

export const add = (
    scene : Scene
) : Model => {

    const mesh : Array<Object3D> =[];
    const updateActions : Array<Update> = [];
    const animations : Array<AnimationAction> = [];
    const lights : Array<Light> = [];

    const create = () => {

        loadModel(
            'blade_runner_office.glb',
            paths.stage,
            (gltf:GLTF) => {

                scene.add(gltf.scene);
                mesh.push(gltf.scene);

                const highLightPos = new Vector3(-50, 10, 200);
                const highLight = new PointLight( 0xffffff, 350);
                highLight.name = 'bladeRunnerHighLight';
                highLight.position.copy(highLightPos);
                gltf.scene.add(highLight);
                lights.push(highLight);

                const ambientLight : AmbientLight = new AmbientLight(0xffffff, 1.25);
                ambientLight.name = 'bladeRunnerAmbientLight';
                gltf.scene.add(ambientLight);
                lights.push(ambientLight);

                gltf.scene.scale.setScalar(1200);
                gltf.scene.position.setX(850);
                gltf.scene.position.setY(-1300);
                gltf.scene.position.setZ(-950);
            }
        )
    };

    const { actions } = addActions({
            updateActions,
            mesh,
            lights,
            animations
        },
        actionDefinitions,
    );

    return {
        create,
        update: modelUpdate(
            updateActions,
            {
                mesh,
                lights,
            }
        ),
        name: 'bladeRunner',
        actions,
        mesh,
        lights
    }
};
