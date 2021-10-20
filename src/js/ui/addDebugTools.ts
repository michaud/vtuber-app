import { Group, Scene } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import addOriginHelper from "../helpers/addOriginHelper";

const onClickOrigin = (group:Group) => () => {

    group.visible = !group.visible;
};
const onClickReset = (controls:OrbitControls) => () => {

    controls.reset();
};

const addDebugTools = (scene:Scene, controls : OrbitControls)=> {
    
    const btnOrigin:HTMLButtonElement = document.querySelector("#btn_origin");
    const btnReset:HTMLButtonElement = document.querySelector("#btn_reset_controls");
    const group = addOriginHelper(scene);
    group.visible = false;

    document.addEventListener('keyup', 
        (ev : KeyboardEvent) => {
            
            console.log('ev.key:', ev.key)
            ev.key === 'Clear' && onClickOrigin(group)();
            ev.key === 'Numpad 0' && onClickReset(controls)();
        });


    btnOrigin.onclick = onClickOrigin(group);
    btnReset.onclick = onClickReset(controls);
}

export default addDebugTools;
