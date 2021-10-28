import { EffectPass } from "types/PostProcessing";
import { Pane } from "tweakpane";
import { passUIInteractions } from "./passUIInteractions";

const addComposerInteractions = (
    passes : Array<EffectPass>,
    pane:Pane
) => {

    const folder = pane.addFolder({
        title: 'post processing',
        expanded: false,
    });

    passes.forEach(pass => {
        passUIInteractions[pass.name](folder, pass)
    })
};

export default addComposerInteractions;
