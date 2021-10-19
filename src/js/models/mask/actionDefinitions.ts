import { ActionDefinitions } from 'types/actionDefinitions';
import toggleShowAction from '../../action/toggleShowAction';


const actionDefinitions : ActionDefinitions = {
    'show / hide': { updateName: 'toggleShowUpdate', action: toggleShowAction },
}

export default actionDefinitions;
