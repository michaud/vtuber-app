import orevealAction from './orevealAction.js';
import tdRevealAction from './tdRevealAction.js';
import displaceAction from './displaceAction.js';
import twirlAction from './twirlAction.js';
import toggleShowAction from './toggleShowAction.js';
import switchToCirclesAction from './switchToCirclesAction.js';
import normalMoveOutAction from './normalMoveOutAction.js';
import normalMoveInAction from './normalMoveInAction.js';

/* key is used as label for button */
const emojisActionDefinitions = {
    'show / hide': { update: 'toggleShowUpdate', action: toggleShowAction },
    'top down': { update: 'tdRevealUpdate', action: tdRevealAction },
    'oreveal': { update: 'orevealUpdate', action: orevealAction },
    'displace': { update: 'displaceUpdate', action: displaceAction },
    'sqr / circ': { update: 'switchToCirclesUpdate', action: switchToCirclesAction },
    'twirl': { update: 'twirlUpdate', action: twirlAction },
    'move out': { update: 'normalMoveOutUpdate', action: normalMoveOutAction },
    'move in': { update: 'normalMoveInUpdate', action: normalMoveInAction }
};

export default emojisActionDefinitions;
