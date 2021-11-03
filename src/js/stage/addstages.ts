import { Model } from "types/model";
import { AnimationMixer, Scene } from "three";
import stageCreators from "./stageCreators";
export interface StageResources {
    scene:Scene,
    mixer:AnimationMixer,
    autoLoad?:Array<string>
}

const addstages = ({
    scene,
    mixer,
    autoLoad
} : StageResources) : Array<Model> => stageCreators.map(
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
