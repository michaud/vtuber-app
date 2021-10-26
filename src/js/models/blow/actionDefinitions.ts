
import blowAction from './blowAction';
import blowDetectAction from './blowDetectAction';
import toggleShowAction from '../../action/toggleShowAction';
import { ActionDefinitionList } from 'types/actionDefinitions';

const actionDefinitions : ActionDefinitionList = {
    'show / hide': {
        updateName: 'toggleShowUpdate',
        action: toggleShowAction
    },
    'blow': {
        updateName: 'blowUpdate',
        action: blowAction,
        detectAction: blowDetectAction
    }
};

export default actionDefinitions;
