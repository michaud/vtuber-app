import { SceneCreator } from "types/SceneCreator";
import addBackground from "./pointy/addBackground";
import addBlinds from "./blinds/addBlinds";

const stageCreators : Array<SceneCreator> = [
    addBackground,
    addBlinds
]

export default stageCreators;
