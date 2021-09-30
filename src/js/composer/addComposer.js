import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { passes as effectPasses } from "./passes";

const addComposer = (scene, camera, renderer, pane) => {

    const renderScene = new RenderPass( scene, camera );
    const composer = new EffectComposer( renderer );

    composer.addPass( renderScene );

    const folder = pane.addFolder({
        title: 'post processing',
        expanded: false,
    });

    effectPasses.forEach(pass => {
        pass({
            composer,
            renderScene,
            renderer,
            folder
        });
    });

    return composer;
};

export default addComposer;
