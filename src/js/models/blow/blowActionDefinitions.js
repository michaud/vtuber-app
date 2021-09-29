
import blowAction from './blowAction';
import blowDetectAction from './blowDetectAction';
import toggleShowAction from './toggleShowAction';

const blowActionDefinitions = {
    'show / hide': {
        update: 'toggleShowUpdate',
        action: toggleShowAction
    },
    'blow': {
        update: 'blowUpdate',
        action: blowAction,
        detections: blowDetectAction
    }
};

export default blowActionDefinitions;
