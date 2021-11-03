import { EffectPass } from "types/PostProcessing";
import { FolderApi } from "tweakpane";

export interface PassUIInteractions {
    [index:string]: (folder: FolderApi, effectPass: EffectPass) => void;
}
