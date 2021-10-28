import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { WebGLRenderer } from "three";
import { Pass } from "three/examples/jsm/postprocessing/Pass.js";

export type PassArguments = {
    composer: EffectComposer,
    renderer: WebGLRenderer
}

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
