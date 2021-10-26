import toggleShowAction from 'action/toggleShowAction';
import { ActionDefinitionList } from 'types/actionDefinitions';


const bladeRunnerActionDefinitions : ActionDefinitionList = {
    'show / hide': { updateName: 'toggleShowUpdate', action: toggleShowAction }
};

export default bladeRunnerActionDefinitions;
