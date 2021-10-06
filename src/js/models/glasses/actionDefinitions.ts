import { ActionDefinitions } from '../../types/actionDefinitions';
import toggleShowAction from '../action/toggleShowAction';


const actionDefinitions : ActionDefinitions = {
    'show / hide': { update: 'toggleShowUpdate', action: toggleShowAction },
}

export default actionDefinitions;
