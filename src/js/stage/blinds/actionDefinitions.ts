import { ActionDefinitionList } from 'types/actionDefinitions';

import toggleShowAction from '../../action/toggleShowAction';

import openCloseAction from './openCloseAction';

const duckActionDefinitions : ActionDefinitionList = {
    'show / hide': { updateName: 'toggleShowUpdate', action: toggleShowAction },
    'open / close': { updateName: 'openCloseUpdate', action: openCloseAction }
};

export default duckActionDefinitions;
