import {
    AnimationAction,
    AnimationClip,
    AnimationMixer,
    Color,
    DoubleSide,
    Group,
    LoopOnce,
    Mesh,
    MeshStandardMaterial,
    Object3D,
    PlaneGeometry,
    Scene,
    Texture,
    TextureLoader
} from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import addActions from "../../models/addActions";
import actionDefinitions from "./actionDefinitions";
import loadModel from "../../models/loadModel";
import { Update } from "types/Update";
import modelUpdate from "../../models/modelUpdate";
import paths from "constant/paths";

const addBlinds = (
    scene : Scene,
    mixer : AnimationMixer
) => {

    const mesh : Array<Object3D> =[];
    const updateActions : Array<Update> = [];
    const animations : Array<AnimationAction> = [];
    const imageList : Array<string> = [
        'pattern_1590067427667_clip01_adj.png'
    ];
    const create = () => {

        loadModel(
            'blinds.glb',
            paths.stage,
            (gltf:GLTF) => {

                gltf.scene.scale.setScalar(11);

                scene.add(gltf.scene);
                mesh.push(gltf.scene);

                const texture : Texture = new TextureLoader().load(
                    `${paths.background}/empty.pmg`
                );

                const geometry : PlaneGeometry = new PlaneGeometry(1000, 500);
                const material : MeshStandardMaterial = new MeshStandardMaterial({
                    side: DoubleSide,
                    flatShading: true,
                    map: texture,
                    // transparent: true,
                    // opacity: 1
                });
            
                const plane : Mesh = new Mesh(geometry, material);
                plane.name = 'background';
                plane.frustumCulled = false;
    
                /* isolate for transforms */
                const group : Group = new Group();
    
                group.position.setZ(-103);
                group.add(plane);
                
                mesh.push(group);
                scene.add(group);
                const imgtexture = new TextureLoader().load(
                    `${paths.background}/${imageList[0]}`
                );

                (plane.material as MeshStandardMaterial).map = imgtexture;

                gltf.scene.position.setZ(-100);

                gltf.animations.map((clip:AnimationClip) => {

                    const anim : AnimationAction = mixer.clipAction(clip);

                    animations.push(anim);
                    anim.clampWhenFinished = true;
                    /* set backwards so we can flip it to positive at the start */
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
