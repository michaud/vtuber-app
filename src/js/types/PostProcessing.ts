import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { WebGLRenderer } from "three";

export type PassArguments = {
    composer: EffectComposer,
    renderer: WebGLRenderer
}
