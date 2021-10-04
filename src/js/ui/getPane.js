import {
    Pane
} from 'tweakpane';
import * as EssentialsPlugin from '@tweakpane/plugin-essentials';

const getPane = () => {
    const pane = new Pane();
    pane.containerElem_.style.width = '250px';
    pane.containerElem_.style.left = 0;
    pane.registerPlugin(EssentialsPlugin);

    const status = pane.addBlade({
        view: 'text',
        label: 'status',
        parse: (v) => String(v),
        value: 'loading...',
    });

    return {
        pane,
        status
    };
}

export default getPane;
