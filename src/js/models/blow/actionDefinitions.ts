
import blowAction from './blowAction';
import blowDetectAction from './blowDetectAction';
import toggleShowAction from '../action/toggleShowAction';


const blowActionDefinitions = {
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

export default blowActionDefinitions;
