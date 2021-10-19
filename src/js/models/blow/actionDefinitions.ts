
import blowAction from './blowAction';
import blowDetectAction from './blowDetectAction';
import toggleShowAction from '../../action/toggleShowAction';
import { ActionDefinitions } from '../../types/actionDefinitions';

const actionDefinitions : ActionDefinitions = {
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
