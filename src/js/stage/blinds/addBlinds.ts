import {
    AnimationAction,
    AnimationClip,
    AnimationMixer,
    LoopOnce,
    Object3D,
    Scene
} from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import addActions from "../../models/addActions";
import actionDefinitions from "./actionDefinitions";
import loadModel from "../../models/loadModel";
import { Update } from "types/Update";
import modelUpdate from "../../models/modelUpdate";
import paths from "../../constant/paths";

const addBlinds = (
    scene : Scene,
    mixer : AnimationMixer
) => {

    const mesh : Array<Object3D> =[];
    const updateActions : Array<Update> = [];
    const animations : Array<AnimationAction> = [];

    const create = () => {

        loadModel(
            'blinds.glb',
            paths.stage,
            (gltf:GLTF) => {

                gltf.scene.scale.setScalar(10);

                scene.add(gltf.scene);
                mesh.push(gltf.scene);

                gltf.scene.position.setZ(-100);

                gltf.animations.map((clip:AnimationClip) => {

                    const anim : AnimationAction = mixer.clipAction(clip);

                    animations.push(anim);
                    anim.clampWhenFinished = true;
                    anim.timeScale = -1;
                    anim.setLoop(LoopOnce, 1);
                });
            }
        )
    };

    const { actions } = addActions(
        updateActions,
        mesh,
        actionDefinitions,
        animations
    );

    return {
        create,
        update: modelUpdate(
            mesh,
            updateActions
        ),
        name: 'blinds',
        actions,
        mesh
    }
};

export default addBlinds;
