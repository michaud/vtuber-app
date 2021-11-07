import { Update } from "types/Update";
import { SceneCreator } from "types/SceneCreator";
import {
    DoubleSide,
    Mesh,
    MeshStandardMaterial,
    Object3D,
    TextureLoader,
} from "three";
import addActions from "../addActions";
import modelUpdate from "../modelUpdate";
import actionDefinitions from "./actionDefinitions";
import paths from "constant/paths";

const addMask : SceneCreator = (
    scene,
    _mixer,
    faceGeometry
) => {

    const mesh : Array<Object3D> = [];
    const updateActions : Array<Update> = [];

    const model = {
        create: () => {},
        update: modelUpdate(
            updateActions,
            { mesh }
        ),
        name: 'mask',
        mesh,
        actions: {},
        active: false
    };

    model.create = () => {

        /* Load textures for mask material. */
        const colorTexture = new TextureLoader().load(
            `${paths.mask}mesh_map.jpg`
        );
        // const aoTexture = new TextureLoader().load("../../assets/ao.jpg");
        // const alphaTexture = new TextureLoader().load("../../assets/mask.png");

        /* Create material for mask. */
        const material = new MeshStandardMaterial({
            // color: 0xFF0000,
            // roughness: 0.8,
            // metalness: 0.1,
            // alphaMap: alphaTexture,
            // aoMap: aoTexture,
            map: colorTexture,
            // roughnessMap: colorTexture,
            transparent: true,
            side: DoubleSide,
        });

        /* Create mask mesh. */
        const mask = new Mesh(faceGeometry, material);
        mask.name = model.name;
        scene.add(mask);
        mask.receiveShadow = mask.castShadow = false;

        mesh.push(mask);
        model.active = true;
    };

    const { actions } = addActions({
            updateActions,
            mesh,
        },
        actionDefinitions
    );

    model.actions = actions;

    return model;
};

export default addMask;
