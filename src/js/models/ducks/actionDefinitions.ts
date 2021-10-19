import { ActionDefinitions } from 'types/actionDefinitions';

import toggleShowAction from '../../action/toggleShowAction';

import stopAction from './stopAction';
import startAction from './startAction';

const duckActionDefinitions : ActionDefinitions = {
    'show / hide': { updateName: 'toggleShowUpdate', action: toggleShowAction },
    'start': { updateName: 'startUpdate', action: startAction },
    'stop': { updateName: 'stopUpdate', action: stopAction }
};

export default duckActionDefinitions;
