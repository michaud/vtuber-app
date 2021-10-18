import { Group, Scene } from "three";
import addOriginHelper from "../helpers/addOriginHelper";

const onClickOrigin = (group:Group) => () => {

    group.visible = !group.visible;
};

const addDebugTools = (scene:Scene)=> {
    
    const btnOrigin:HTMLButtonElement = document.querySelector("#btn_origin");
    const group = addOriginHelper(scene);
    group.visible = false;

    document.addEventListener('keyup', 
        (ev : KeyboardEvent) => ev.key === 'Clear' && onClickOrigin(group)()
    );


    btnOrigin.onclick = onClickOrigin(group);
}

export default addDebugTools;
