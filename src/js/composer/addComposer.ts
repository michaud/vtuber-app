import { OrthographicCamera, Scene, WebGLRenderer } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { FolderApi } from "tweakpane";
import { passes as effectPasses } from "./passes";

const addComposer = (
    scene:Scene,
    camera:OrthographicCamera,
    renderer:WebGLRenderer,
    pane:FolderApi) => {

    const renderScene:RenderPass = new RenderPass( scene, camera );
    const composer:EffectComposer = new EffectComposer( renderer );

    composer.addPass( renderScene );

    const folder = pane.addFolder({
        title: 'post processing',
        expanded: false,
    });

    effectPasses.forEach((pass) => {
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
