import { Group, Light, Object3D, Scene, SpotLightHelper } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import addOriginHelper from "../helpers/addOriginHelper";
import addPositionHelper from "../helpers/addPositionHelper";

const onClickOrigin = (group:Group) => () => {

    group.visible = !group.visible;
};
const onClickReset = (controls:OrbitControls) => () => {

    controls.reset();
};

const onClickLights = (
    scene: Scene,
    lights: Array<Light>
    ) => {

    const helpers : Array<Object3D> = [];

    lights.forEach(light => {

        if(
            light.type === 'SpotLight' &&
            scene.children.findIndex(item => item.name === `${light.name}_position`) < 0
        ) {

            if(light.type === 'SpotLight') {

                const spotLightHelper = new SpotLightHelper( light );
                spotLightHelper.name = `${light.name}_position`;
                scene.add( spotLightHelper );
                spotLightHelper.scale.setScalar(.1);
    
    
                spotLightHelper.visible = false;
                helpers.push(spotLightHelper);
                scene.add(spotLightHelper);
            }
        }
    })

    return (ev:unknown) => {
        helpers.forEach(item => item.visible = !item.visible);
    }
}

const addDebugTools = (scene:Scene, controls : OrbitControls, lights: Array<Light>)=> {
    
    const btnOrigin:HTMLButtonElement = document.querySelector("#btn_origin");
    const btnReset:HTMLButtonElement = document.querySelector("#btn_reset_controls");
    const btnLights:HTMLButtonElement = document.querySelector("#btn_lights");

    const group = addOriginHelper(scene);
    group.visible = false;

    const handleOnLights = onClickLights(scene, lights);

    document.addEventListener('keyup', 
        (ev : KeyboardEvent) => {
            
            console.log('ev.key:', typeof ev.key)
            ev.key === 'Clear' && onClickOrigin(group)();
            ev.key === 'Numpad 0' && onClickReset(controls)();
        });

    btnOrigin.onclick = onClickOrigin(group);
    btnReset.onclick = onClickReset(controls);
    btnLights.onclick = handleOnLights;
}

export default addDebugTools;
