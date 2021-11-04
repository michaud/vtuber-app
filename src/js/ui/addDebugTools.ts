import { Model } from "types/model";
import {
    Camera,
    Group,
    Object3D,
    OrthographicCamera,
    PerspectiveCamera,
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

enum CameraType {
    Orthographic,
    Perspective
}

const onClickCamera = (
    type : CameraType,
    camera : Camera
) => {

    return (ev:unknown) => {

        switch (type) {

            case CameraType.Orthographic: {
            console.log('Orthographic')

                camera = new OrthographicCamera(
                    1, 1, 1, 1,
                    -10000, 10000
                );

                break;
            }

            case CameraType.Perspective: {

                console.log('PerspectiveCamera')
                camera = new PerspectiveCamera(
                    50,
                    1,
                    0.1,
                    10000
                );

                break;
            }

            default: {

                camera = new OrthographicCamera(
                    1, 1, 1, 1,
                    -10000, 10000
                );

                break;
            }
        }
    }
}

const addDebugTools = (
    scene:Scene,
    camera: Camera,
    controls : OrbitControls,
    stages: Array<Model>
)=> {
    
    const btnOrigin : HTMLButtonElement = document.querySelector("#btn_origin");
    const btnReset : HTMLButtonElement = document.querySelector("#btn_reset_controls");
    const btnLights : HTMLButtonElement = document.querySelector("#btn_lights");
    const btnOrth : HTMLButtonElement = document.querySelector("#btn-orth");
    const btnPers : HTMLButtonElement = document.querySelector("#btn-pers");

    const group = addOriginHelper(scene);
    group.visible = false;

    const handleOnLights = onClickLights(scene, stages);

    document.addEventListener(
        'keyup', 
        (ev : KeyboardEvent) => {
            
            ev.key === 'Clear' && onClickOrigin(group)();
            ev.key === 'Numpad 0' && onClickReset(controls)();
        }
    );

    btnOrth.onclick = onClickCamera(CameraType.Orthographic, camera);
    btnPers.onclick = onClickCamera(CameraType.Perspective, camera);
    btnOrigin.onclick = onClickOrigin(group);
    btnReset.onclick = onClickReset(controls);
    btnLights.onclick = handleOnLights;
}

export default addDebugTools;
