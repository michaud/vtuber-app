import orevealAction from './orevealAction.js';
import tdRevealAction from './tdRevealAction.js';
import displaceAction from './displaceAction.js';
import twirlAction from './twirlAction.js';
import toggleShowAction from './toggleShowAction.js';
import switchToCirclesAction from './switchToCirclesAction.js';
import normalMoveAction from './normalMoveAction.js';

/* key is used as label for button */
const emojisActionDefinitions = {
    'show / hide': { update: 'toggleShowUpdate', action: toggleShowAction },
    'top down reveal': { update: 'tdRevealUpdate', action: tdRevealAction },
    'oreveal': { update: 'orevealUpdate', action: orevealAction },
    'displace': { update: 'displaceUpdate', action: displaceAction },
    'square / circles': { update: 'switchToCirclesUpdate', action: switchToCirclesAction },
    'twirl': { update: 'twirlUpdate', action: twirlAction },
    'normal move': { update: 'normalMoveUpdate', action: normalMoveAction }
};

export default emojisActionDefinitions;
