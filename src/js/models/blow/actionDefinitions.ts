
import blowAction from './blowAction';
import toggleShowAction from '../../action/toggleShowAction';
import { ActionDefinitionList } from 'types/actionDefinitions';

const actionDefinitions : ActionDefinitionList = {
    'show / hide': {
        updateName: 'toggleShowUpdate',
        action: toggleShowAction
    },
    'blow': {
        updateName: 'blowUpdate',
        action: blowAction
    }
};

export default actionDefinitions;
