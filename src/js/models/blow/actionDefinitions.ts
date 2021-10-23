
import blowAction from './blowAction';
import blowDetectAction from './blowDetectAction';
import toggleShowAction from '../../action/toggleShowAction';
import { ActionDefinitionList } from 'types/actionDefinitions';

const actionDefinitions : ActionDefinitionList = {
    'show / hide': {
        updateName: 'toggleShowUpdate',
        action: toggleShowAction,
        detections: blowDetectAction
    },
    'blow': {
        updateName: 'blowUpdate',
        action: blowAction,
        detections: blowDetectAction
    }
};

export default actionDefinitions;
