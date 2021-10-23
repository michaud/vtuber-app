import {
    AmbientLight,
    AnimationAction,
    AnimationClip,
    AnimationMixer,
    Color,
    DoubleSide,
    Group,
    Light,
    LoopOnce,
    Mesh,
    MeshStandardMaterial,
    Object3D,
    PlaneGeometry,
    PointLight,
    Scene,
    SpotLight,
    Texture,
    TextureLoader,
    Vector3
} from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import addActions from "../../models/addActions";
import actionDefinitions from "./actionDefinitions";
import loadModel from "../../models/loadModel";
import { Update } from "types/Update";
import modelUpdate from "../../models/modelUpdate";
import paths from "constant/paths";
import { Model } from "types/model";

const addBlinds = (
    scene : Scene,
    mixer : AnimationMixer
) : Model => {

    const mesh : Array<Object3D> =[];
    const updateActions : Array<Update> = [];
    const animations : Array<AnimationAction> = [];
    const lights : Array<Light> = [];
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

                const highLightPos = new Vector3(-50, 10, 200);
                const highLight = new PointLight( 0xffffff, 350);
                highLight.name = 'blindsHighLight';
                highLight.position.copy(highLightPos);
                scene.add(highLight);
                lights.push(highLight);

                const blindsAmbientLight : AmbientLight = new AmbientLight(0xffffff, 1.25);
                blindsAmbientLight.name = 'blindsAmbientLight';
                scene.add(blindsAmbientLight);
                lights.push(blindsAmbientLight);
            
                const geometry : PlaneGeometry = new PlaneGeometry(1000, 500);
                const material : MeshStandardMaterial = new MeshStandardMaterial({
                    side: DoubleSide,
                    flatShading: true,
                    map: texture
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

                console.log('gltf.animations:', gltf.animations)
                gltf.animations.forEach((clip:AnimationClip) => {

                    const anim : AnimationAction = mixer.clipAction(clip);

                    anim.clampWhenFinished = true;
                    /* set backwards so we can flip it to positive at the start */
                    anim.timeScale = -1;
                    anim.setLoop(LoopOnce, 1);
                    animations.push(anim);
                });
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
        update: modelUpdate({
            mesh,
            lights,
            updateActions
        }),
        name: 'blinds',
        actions,
        mesh,
        lights
    }
};

export default addBlinds;
