import { ActionDefinitionList } from 'types/actionDefinitions';
import toggleShowAction from '../../action/toggleShowAction';


const actionDefinitions : ActionDefinitionList = {
    'show / hide': { updateName: 'toggleShowUpdate', action: toggleShowAction },
}

export default actionDefinitions;
