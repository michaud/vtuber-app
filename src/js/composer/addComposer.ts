import {
    OrthographicCamera,
    Scene,
    WebGLRenderer
} from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ComposerResources } from "types/PostProcessing";
import { passes } from "./passes";

const addComposer = (
    scene : Scene,
    camera : OrthographicCamera,
    renderer : WebGLRenderer
) : ComposerResources => {

    const renderScene : RenderPass = new RenderPass( scene, camera );
    const composer : EffectComposer = new EffectComposer( renderer );

    composer.addPass( renderScene );

    const effectPasses = passes.map((pass) => 
        pass({
            composer,
            renderer,
            camera,
            scene
        })
    );

    return {
        composer,
        passes: effectPasses
    }
};

export default addComposer;
