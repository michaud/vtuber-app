import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { WebGLRenderer } from "three";
import { FolderApi } from "tweakpane";

export type PassArguments = {
        composer : EffectComposer,
        renderer : WebGLRenderer,
        folder : FolderApi
}
