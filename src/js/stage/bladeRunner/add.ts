import { Update } from "types/Update";
import { Model } from "types/model";
import {
    AnimationAction,
    Light,
    Object3D,
    Scene,
    SpotLight,
} from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import addActions from "models/addActions";
import actionDefinitions from "./actionDefinitions";
import loadModel from "models/loadModel";
import modelUpdate from "models/modelUpdate";
import paths from "constant/paths";

export const add = (
    scene : Scene
) : Model => {

    const mesh : Array<Object3D> =[];
    const updateActions : Array<Update> = [];
    const animations : Array<AnimationAction> = [];
    const lights : Array<Light> = [];

    const model = {
        create: () => {},
        update: modelUpdate(
            updateActions,
            {
                mesh,
                lights,
            }
        ),
        name: 'bladeRunnerStage',
        actions:{},
        mesh,
        lights,
        active: false
    };

    model.create = () => {

        loadModel(
            'blade_runner_office_stage.glb',
            paths.stage,
            (gltf:GLTF) => {
                gltf.scene.name = model.name;
                scene.add(gltf.scene);
                mesh.push(gltf.scene);
                gltf.scene.traverse(
                    (el:Object3D) => {
                        if(el.type === 'SpotLight') {
                            (el as SpotLight).decay = 0;
                            lights.push(el as Light);
                        }
                    }
                );
                // const highLightPos = new Vector3(-50, 10, 200);
                // const highLight = new PointLight( 0xffffff, 350);
                // highLight.name = 'bladeRunnerHighLight';
                // highLight.position.copy(highLightPos);
                // gltf.scene.add(highLight);
                // lights.push(highLight);

                // const ambientLight : AmbientLight = new AmbientLight(0xffffff, 1.25);
                // ambientLight.name = 'bladeRunnerAmbientLight';
                // gltf.scene.add(ambientLight);
                // lights.push(ambientLight);

                model.actions = true;
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
    
    model.actions = actions;

    return model;
};
