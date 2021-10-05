import { AnimationMixer, Scene } from "three";
import { FaceMeshFaceGeometry } from "../face/face.js";
import { Model } from "../types/model.js";
import models from "./models.js";

const addModels = (
    scene:Scene,
    mixer:AnimationMixer,
    faceGeometry:FaceMeshFaceGeometry,
    autoLoad:string[]
) => models.map(
    add => {

        const model:Model = add(
            scene,
            mixer,
            faceGeometry
        );

        if(autoLoad.includes(model.name)) model.create();

        return model;
    }
);

export default addModels;
