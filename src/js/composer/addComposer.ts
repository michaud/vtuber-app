import {
    OrthographicCamera,
    Scene,
    WebGLRenderer
} from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { Pass } from "three/examples/jsm/postprocessing/Pass.js";
import { passes } from "./passes";

export type EffectPassParams = {
    [index:string]: string | number | boolean
}

export type PassList = {
    [index:string]: Pass
}

export type EffectPass = {
    name: string,
    params: EffectPassParams,
    passes: PassList,
    renderer?: WebGLRenderer 
}

export type ComposerResources = {
    composer: EffectComposer,
    passes: Array<EffectPass>
}

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
            renderer
        })
    );

    return {
        composer,
        passes: effectPasses
    }
};

export default addComposer;
