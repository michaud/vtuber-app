import { ActionDefinitions } from '../../types/actionDefinitions';

import toggleShowAction from '../action/toggleShowAction';

import stopAction from './stopAction';
import startAction from './startAction';

const duckActionDefinitions : ActionDefinitions = {
    'show / hide': { update: 'toggleShowUpdate', action: toggleShowAction },
    'start': { update: 'startUpdate', action: startAction },
    'stop': { update: 'stopUpdate', action: stopAction }
};

export default duckActionDefinitions;
