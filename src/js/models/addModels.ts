import { Model } from "types/model";
import FaceGeometry from "face/FaceGeometry";
import { AnimationMixer, Scene } from "three";
import modelCreators from "./modelCreators";

const addModels = (
    scene : Scene,
    mixer : AnimationMixer,
    faceGeometry : FaceGeometry,
    autoLoad : Array<string>
) : Array<Model> => modelCreators.map(
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
