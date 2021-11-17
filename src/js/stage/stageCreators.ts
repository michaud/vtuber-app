import { SceneCreator } from "types/SceneCreator";
import { add as addPointy } from "./pointy/add";
import { add as addBlinds } from "./blinds/add";
import { add as addBladeRunner } from "./bladeRunner/add";
import { add as addBaseStage } from "./baseStage/add";
import { add as addSpiritedAway } from "./spiritedAway/add";

const stageCreators : Array<SceneCreator> = [
    addBaseStage,
    addPointy,
    addBlinds,
    addBladeRunner,
    addSpiritedAway
]

export default stageCreators;
