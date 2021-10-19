import addBlow from './blow/addBlow';
import addBowler from './bowler/addBowler';
import addDucks from './ducks/addDucks';
import addGlasses from './glasses/addGlasses';
import addMask from "./mask/addMask";
import addNose from "./nose/addNose";
import addEmojis from './emojis/addEmojis';
import addMistache from './mistache/addMistache';
import { Update } from '../types/Action';
import { SceneCreator } from '../types/SceneCreator';

const modelCreators : Array<SceneCreator> = [
    addEmojis,
    addDucks,
    addGlasses,
    addNose,
    addMask,
    addBowler,
    addBlow,
    addMistache
];

export default modelCreators;
