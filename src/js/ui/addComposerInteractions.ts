import {
    FolderApi,
    Pane
} from "tweakpane";
import { EffectPass } from "../composer/addComposer";
import addBloomUI from "./addBloomUI";
import addDotScreenUI from "./addDotScreenUI";
import addSobolUI from "./addSobolUI";

export interface passUIInteractions {
    [index:string]: (folder: FolderApi, effectPass: EffectPass) => void;
}

const passUIInteractions : passUIInteractions = {
    'sobolPass': addSobolUI,
    'dotScreenPass': addDotScreenUI,
    'bloomPass': addBloomUI
}

const addComposerInteractions = (
    passes : Array<EffectPass>,
    pane:Pane
) => {

    const folder = pane.addFolder({
        title: 'post processing',
        expanded: false,
    });

    passes.forEach(pass => {
    console.log('pass:', pass)

        console.log('passUIInteractions[pass.name]:', passUIInteractions[pass.name])
        passUIInteractions[pass.name](folder, pass)
    })
};

export default addComposerInteractions;
