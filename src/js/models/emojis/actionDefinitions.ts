import orevealAction from './orevealAction';
import tdRevealAction from './tdRevealAction';
import displaceAction from './displaceAction';
import twirlAction from './twirlAction';
import toggleShowAction from '../action/toggleShowAction';
import switchToCirclesAction from './switchToCirclesAction';
import normalMoveOutAction from './normalMoveOutAction';
import normalMoveInAction from './normalMoveInAction';
import { ActionDefinitions } from '../../types/actionDefinitions';

/* key is used as label for button */
const actionDefinitions : ActionDefinitions = {
    'show / hide': { update: 'toggleShowUpdate', action: toggleShowAction },
    'top down': { update: 'tdRevealUpdate', action: tdRevealAction },
    'oreveal': { update: 'orevealUpdate', action: orevealAction },
    'displace': { update: 'displaceUpdate', action: displaceAction },
    'sqr / circ': { update: 'switchToCirclesUpdate', action: switchToCirclesAction },
    'twirl': { update: 'twirlUpdate', action: twirlAction },
    'move out': { update: 'normalMoveOutUpdate', action: normalMoveOutAction },
    'move in': { update: 'normalMoveInUpdate', action: normalMoveInAction }
};

export default actionDefinitions;
