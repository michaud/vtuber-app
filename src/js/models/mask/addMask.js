import {
    DoubleSide,
    Mesh,
    MeshBasicMaterial,
    MeshStandardMaterial,
    TextureLoader,
} from "three";
import paths from "../../paths";
import addActions from "../addActions";
import maskActionDefinitions from "./maskActionDefinitions";

const addMask = (
    scene,
    _,
    faceGeometry
) => {

    const mesh = [];
    const updateActions = [];

    const create = () => {

        // Load textures for mask material.
        const colorTexture = new TextureLoader().load(`${paths.mask}mesh_map.jpg`);
        // const aoTexture = new TextureLoader().load("../../assets/ao.jpg");
        // const alphaTexture = new TextureLoader().load("../../assets/mask.png");

        // Create material for mask.
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

        // Create mask mesh.
        const mask = new Mesh(faceGeometry, material);
        scene.add(mask);
        mask.receiveShadow = mask.castShadow = false;

        mesh.push(mask);
    };

    const update = (geom, moment) => {

        if(mesh.length === 0) return;
        
        updateActions.map(action => action(geom, moment));
    };

    const { actions } = addActions(
        updateActions,
        mesh,
        maskActionDefinitions
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
