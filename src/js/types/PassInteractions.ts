import { FolderApi } from "tweakpane";
import { EffectPass } from "types/PostProcessing";

export interface PassUIInteractions {
    [index:string]: (folder: FolderApi, effectPass: EffectPass) => void;
}
