import orevealAction from './orevealAction';
import tdRevealAction from './tdRevealAction';
import displaceAction from './displaceAction';
import twirlAction from './twirlAction';
import toggleShowAction from '../../action/toggleShowAction';
import switchToCirclesAction from './switchToCirclesAction';
import normalMoveOutAction from './normalMoveOutAction';
import normalMoveInAction from './normalMoveInAction';
import { ActionDefinitions } from 'types/actionDefinitions';

/* key is used as label for button */
const actionDefinitions : ActionDefinitions = {
    'show / hide': { updateName: 'toggleShowUpdate', action: toggleShowAction },
    'top down': { updateName: 'tdRevealUpdate', action: tdRevealAction },
    'oreveal': { updateName: 'orevealUpdate', action: orevealAction },
    'displace': { updateName: 'displaceUpdate', action: displaceAction },
    'sqr / circ': { updateName: 'switchToCirclesUpdate', action: switchToCirclesAction },
    'twirl': { updateName: 'twirlUpdate', action: twirlAction },
    'move out': { updateName: 'normalMoveOutUpdate', action: normalMoveOutAction },
    'move in': { updateName: 'normalMoveInUpdate', action: normalMoveInAction }
};

export default actionDefinitions;
