import { Model } from "types/model";
import {
    Group,
    Object3D,
    Scene
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import addOriginHelper from "../helpers/addOriginHelper";
import { createLightHelpers } from "./createLightHelpers";

const onClickOrigin = (group:Group) => () => {

    group.visible = !group.visible;
};
const onClickReset = (controls:OrbitControls) => () => {

    controls.reset();
};

const onClickLights = (
    scene: Scene,
    stages: Array<Model>
    ) => {

    const helpers : Array<Object3D> = [];
    
    return (_:unknown) => {

        const lights = createLightHelpers(scene, stages, helpers);

        lights.forEach(light => {

            const helper = helpers.find(helper => helper.name === `${light.name}_position`);

            if(helper) {

                if(light?.visible) {

                    helper.visible = !helper.visible;

                } else {

                    helper.visible = false;
                }
            }
        });
    }
}

const addDebugTools = (
    scene:Scene,
    controls : OrbitControls,
    stages: Array<Model>
)=> {
    
    const btnOrigin:HTMLButtonElement = document.querySelector("#btn_origin");
    const btnReset:HTMLButtonElement = document.querySelector("#btn_reset_controls");
    const btnLights:HTMLButtonElement = document.querySelector("#btn_lights");

    const group = addOriginHelper(scene);
    group.visible = false;

    const handleOnLights = onClickLights(scene, stages);

    document.addEventListener('keyup', 
        (ev : KeyboardEvent) => {
            
            ev.key === 'Clear' && onClickOrigin(group)();
            ev.key === 'Numpad 0' && onClickReset(controls)();
        });

    btnOrigin.onclick = onClickOrigin(group);
    btnReset.onclick = onClickReset(controls);
    btnLights.onclick = handleOnLights;
}

export default addDebugTools;

