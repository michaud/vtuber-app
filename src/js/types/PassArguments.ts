import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { WebGLRenderer } from "three";
import { FolderApi } from "tweakpane";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";

export type PassArguments = {
        composer : EffectComposer,
        renderScene : RenderPass,
        renderer : WebGLRenderer,
        folder : FolderApi
}
