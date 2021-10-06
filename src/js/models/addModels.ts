import { AnimationMixer, Scene } from "three";
import { FaceMeshFaceGeometry } from "../face/face";
import { Model } from "../types/model";
import models from "./models";

const addModels = (
    scene:Scene,
    mixer:AnimationMixer,
    faceGeometry:FaceMeshFaceGeometry,
    autoLoad:Array<string>
) => models.map(
    add => {

        const model : Model = add(
            scene,
            mixer,
            faceGeometry
        );

        if(autoLoad.includes(model.name)) model.create();

        return model;
    }
);

export default addModels;
