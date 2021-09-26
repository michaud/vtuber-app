import orevealAction from './orevealAction.js';
import tdRevealAction from './tdRevealAction.js';
import displaceAction from './displaceAction.js';
import twirlAction from './twirlAction.js';
import toggleShowAction from './toggleShowAction.js';
import switchToCirclesAction from './switchToCirclesAction.js';

const emojisActionDefinitions = {
    'show / hide': { update: 'toggleShowUpdate', action: toggleShowAction },
    'oreveal': { update: 'orevealUpdate', action: orevealAction },
    'top down reveal': { update: 'tdRevealUpdate', action: tdRevealAction },
    'displace': { update: 'displaceUpdate', action: displaceAction },
    'square / circles': { update: 'switchToCirclesUpdate', action: switchToCirclesAction },
    'twirl': { update: 'twirlUpdate', action: twirlAction },
};

export default emojisActionDefinitions;
