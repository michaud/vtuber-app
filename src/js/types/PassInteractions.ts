import { EffectPass } from "types/PostProcessing";
import { FolderApi } from "tweakpane";
import { WebGLRenderer } from "three";

export interface PassUIInteractions {
    [index:string]: (folder: FolderApi, effectPass: EffectPass, renderer : WebGLRenderer) => void;
}
