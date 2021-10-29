import { SceneCreator } from "types/SceneCreator";
import { add as addPointy } from "./pointy/add";
import { add as addBlinds } from "./blinds/add";
import { add as addBladeRunner } from "./bladeRunner/add";
import { add as addBaseStage } from "./baseStage/add";

const stageCreators : Array<SceneCreator> = [
    addBaseStage,
    addPointy,
    addBlinds,
    addBladeRunner,
]

export default stageCreators;
