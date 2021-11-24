import { ActionDefinitionList } from 'types/actionDefinitions';

import toggleShowAction from '../../action/toggleShowAction';

import closeAction from './closeAction';
import openAction from './openAction';

const occulusActionDefinitions : ActionDefinitionList = {
    'show / hide': { updateName: 'toggleShowUpdate', action: toggleShowAction },
    'open': { updateName: 'openUpdate', action: openAction },
    'close': { updateName: 'closeUpdate', action: closeAction }
};

export default occulusActionDefinitions;
