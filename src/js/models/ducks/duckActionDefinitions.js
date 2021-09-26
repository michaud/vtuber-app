import toggleShowAction from './toggleShowAction';
import duckStopAction from './duckStopAction';
import duckStartAction from './duckStartAction';

const duckActionDefinitions = {
    'show / hide': { update: 'toggleShowUpdate', action: toggleShowAction },
    'start': { update: 'duckStartUpdate', action: duckStartAction },
    'stop': { update: 'duckStopUpdate', action: duckStopAction }
};

export default duckActionDefinitions;
