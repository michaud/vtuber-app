import { SceneCreator } from "types/SceneCreator";
import addBackground from "./pointy/addBackground";
import addBlinds from "./blinds/addBlinds";
import addBladeRunner from "./bladeRunner/addBladeRunner";

const stageCreators : Array<SceneCreator> = [
    addBackground,
    addBlinds,
    addBladeRunner
]

export default stageCreators;
