import { add as addBlow } from './blow/add';
import { add as addBowler } from './bowler/add';
import { add as addDucks } from './ducks/add';
import { add as addGlasses } from './glasses/add';
import { add as addMask } from "./mask/add";
import { add as addNose } from "./nose/add";
import { add as addEmojis } from './emojis/add';
import { add as addMistache } from './mistache/add';
import { add as addOcculus } from './occulus/add';
import { add as addEars } from './ears/add';

import { SceneCreator } from 'types/SceneCreator';

const modelCreators : Array<SceneCreator> = [
    addEmojis,
    addDucks,
    addGlasses,
    addNose,
    addMask,
    addBowler,
    addBlow,
    addMistache,
    addOcculus,
    addEars
];

export default modelCreators;
