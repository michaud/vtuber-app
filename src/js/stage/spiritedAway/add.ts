import { Update } from "types/Update";
import { Model } from "types/model";
import {
    AmbientLight,
    AnimationAction,
    DoubleSide,
    Group,
    Light,
    Mesh,
    MeshStandardMaterial,
    Object3D,
    PlaneGeometry,
    PointLight,
    Scene,
    SpotLight,
    Texture,
    TextureLoader,
    Vector3,
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
    const imageList : Array<string> = [
        'spirirted_away_house_bg.png'
    ];

    const model : Model = {
        create: () => {},
        update: modelUpdate(
            updateActions,
            {
                mesh,
                lights,
            }
        ),
        name: 'spiritedAwayStage',
        actions:{},
        mesh,
        lights,
        progress: 0,
        active: false
    };

    model.create = () => {

        loadModel(
            'spirited-away-scene.glb',
            paths.stage,
            (event: ProgressEvent<EventTarget>) => {
                model.progress = 1 / event.total * event.loaded
            },
            (gltf:GLTF) => {

                const texture : Texture = new TextureLoader().load(
                    `${paths.background}/empty.pmg`
                );

                gltf.scene.name = model.name;
                scene.add(gltf.scene);
                mesh.push(gltf.scene);

                const ambientLight : AmbientLight = new AmbientLight(0xffffff, 1.25);
                ambientLight.name = 'spiritedAwayAmbientLight';
                gltf.scene.add(ambientLight);
                lights.push(ambientLight);

                const highLight1Pos = new Vector3(-1000, 1000, 200);
                const highLight1 = new PointLight( 0xffffff, 2);
                highLight1.name = 'spiritedAwayHighLight1';
                highLight1.position.copy(highLight1Pos);
                gltf.scene.add(highLight1);
                lights.push(highLight1);
                gltf.scene.add(highLight1);

                const highLight2Pos = new Vector3(1000, 1000, 200);
                const highLight2 = new PointLight( 0xffffff, 2);
                highLight2.name = 'spiritedAwayHighLight2';
                highLight2.position.copy(highLight2Pos);
                gltf.scene.add(highLight2);
                lights.push(highLight2);
                gltf.scene.add(highLight2);

                gltf.scene.traverse(
                    (el:Object3D) => {
                        if(el.type === 'SpotLight' || el.type === 'PointLight') {
                            (el as SpotLight).decay = 0;
                            lights.push(el as Light);
                        }
                    }
                );

                const geometry : PlaneGeometry = new PlaneGeometry(1000, 500);
                const material : MeshStandardMaterial = new MeshStandardMaterial({
                    side: DoubleSide,
                    flatShading: true,
                    map: texture
                });
            
                const plane : Mesh = new Mesh(geometry, material);
                plane.name = 'spiritedAwaybackground';
                plane.frustumCulled = false;

                const imgtexture = new TextureLoader().load(
                    `${paths.background}/${imageList[0]}`
                );

                (plane.material as MeshStandardMaterial).map = imgtexture;

                /* isolate for transforms */
                const group : Group = new Group();

                group.position.setZ(-1000);
                group.position.setY(250);
                group.scale.setScalar(2.75);
                group.add(plane);
                
                mesh.push(group);
                gltf.scene.add(group);
                
                model.active = true;
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
