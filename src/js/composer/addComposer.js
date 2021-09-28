import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { passes as effectPasses } from "./passes";

const addComposer = (scene, camera, renderer, gui) => {

    const renderScene = new RenderPass( scene, camera );
    const composer = new EffectComposer( renderer );

    composer.addPass( renderScene );

    effectPasses.forEach(pass => {
        pass({
            composer,
            renderScene,
            renderer,
            gui
        });
    });

    return composer;
};

export default addComposer;
