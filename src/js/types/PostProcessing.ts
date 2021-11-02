import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { Mesh, OrthographicCamera, Scene, ShaderMaterial, WebGLRenderer, WebGLRenderTarget } from "three";
import { Pass } from "three/examples/jsm/postprocessing/Pass.js";

export type PassArguments = {
    composer : EffectComposer,
    renderer : WebGLRenderer,
    camera : OrthographicCamera,
    scene : Scene
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
    passes?: PassList,
    renderer?: WebGLRenderer ,
    passComposer?: EffectComposer,
    render?: () => void,
    pp?: PostProcessingProps
}

export type ComposerResources = {
    composer: EffectComposer,
    passes?: Array<EffectPass>
}

export type PostProcessingProps = {
    scene: Scene,
    camera: OrthographicCamera,
    rtTextureColors: WebGLRenderTarget,
    rtTextureDepth: WebGLRenderTarget,
    rtTextureDepthMask: WebGLRenderTarget,
    rtTextureGodRays1: WebGLRenderTarget,
    rtTextureGodRays2: WebGLRenderTarget,
    godrayMaskUniforms : any,
    materialGodraysDepthMask : ShaderMaterial,
    godrayGenUniforms: any,
    materialGodraysGenerate: ShaderMaterial,
    godrayCombineUniforms :any,
    materialGodraysCombine : ShaderMaterial,
    godraysFakeSunUniforms : any,
    materialGodraysFakeSun : ShaderMaterial,
    quad: Mesh
}

export interface TpParams {
    [index : string]: number | boolean
}
