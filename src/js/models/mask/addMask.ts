import {
    AnimationMixer,
    DoubleSide,
    Mesh,
    MeshStandardMaterial,
    Object3D,
    Scene,
    TextureLoader,
} from "three";

import paths from "../../constants/paths";
import { FaceMeshFaceGeometry } from "../../face/face";
import { Update } from "../../types/Action";
import { Model } from "../../types/model";
import addActions from "../addActions";
import actionDefinitions from "./actionDefinitions";

const addMask = (
    scene : Scene,
    _mixer: AnimationMixer,
    faceGeometry : FaceMeshFaceGeometry
) : Model => {

    const mesh : Array<Object3D> = [];
    const updateActions : Array<Update> = [];

    const create = () => {

        /* Load textures for mask material. */
        const colorTexture = new TextureLoader().load(`${paths.mask}mesh_map.jpg`);
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
        scene.add(mask);
        mask.receiveShadow = mask.castShadow = false;

        mesh.push(mask);
    };

    const update : Update = (
        geom : FaceMeshFaceGeometry,
        moment : number
    ) => {

        if(mesh.length === 0) return;
        
        updateActions.map(action => action(geom, moment));
    };

    const { actions } = addActions(
        updateActions,
        mesh,
        actionDefinitions
    );

    return {
        create,
        update,
        name: 'mask',
        mesh,
        actions
    };
};

export default addMask;