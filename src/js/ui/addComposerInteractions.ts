import { EffectPass } from "types/PostProcessing";
import { Pane } from "tweakpane";
import { passUIInteractions } from "./passUIInteractions";
import { WebGLRenderer } from "three";

const addComposerInteractions = (
    passes : Array<EffectPass>,
    renderer: WebGLRenderer,
    pane:Pane
) => {

    const folder = pane.addFolder({
        title: 'post processing',
        expanded: false,
    });

    passes.forEach(pass => {
        passUIInteractions[pass.name]?.(folder, pass, renderer)
    })
};

export default addComposerInteractions;
