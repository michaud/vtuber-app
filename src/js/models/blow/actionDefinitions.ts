
import blowAction from './blowAction';
import blowDetectAction from './blowDetectAction';
import toggleShowAction from '../action/toggleShowAction';


const blowActionDefinitions = {
    'show / hide': {
        update: 'toggleShowUpdate',
        action: toggleShowAction,
        detections: blowDetectAction
    },
    'blow': {
        update: 'blowUpdate',
        action: blowAction,
        detections: blowDetectAction
    }
};

export default blowActionDefinitions;
