import {
    AnimationMixer,
    DoubleSide,
    Mesh,
    MeshStandardMaterial,
    Object3D,
    Scene,
    TextureLoader,
} from "three";

import { Update } from "types/Update";
import { Model } from "types/model";
import addActions from "../addActions";
import modelUpdate from "../modelUpdate";
import actionDefinitions from "./actionDefinitions";
import paths from "constant/paths";
import FaceGeometry from "face/FaceGeometry";
import { SceneCreator } from "types/SceneCreator";

const addMask : SceneCreator = (
    scene,
    _mixer,
    faceGeometry
) => {

    const mesh : Array<Object3D> = [];
    const updateActions : Array<Update> = [];
    const name = 'mask';

    const create = () => {

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
        mask.name = name;
        scene.add(mask);
        mask.receiveShadow = mask.castShadow = false;

        mesh.push(mask);
    };

    const { actions } = addActions({
            updateActions,
            mesh,
        },
        actionDefinitions
    );

    return {
        create,
        update: modelUpdate(
            updateActions,
            { mesh }
        ),
        name,
        mesh,
        actions
    };
};

export default addMask;
