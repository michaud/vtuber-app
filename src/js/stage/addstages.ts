import FaceGeometry from "face/FaceGeometry";
import { AnimationMixer, Scene } from "three";

import { Model } from "types/model";
import stageCreators from "./stageCreators";

const addstages = (
    scene:Scene,
    mixer:AnimationMixer,
    _geom?:FaceGeometry,
    autoLoad?:Array<string>
) : Array<Model> => stageCreators.map(
    add => {

        const model : Model = add(
            scene,
            mixer
        );

        if(autoLoad?.includes(model.name)) model.create();

        return model;
    }
);

export default addstages;
