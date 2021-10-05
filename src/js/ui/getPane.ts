import { Pane } from 'tweakpane';

import {
    BladeApi,
    BladeController,
    View
} from '@tweakpane/core';

import * as EssentialsPlugin from '@tweakpane/plugin-essentials';

export type Panels = { pane:Pane, status:BladeApi<BladeController<View>> };

const getPane = ():Panels => {

    const pane:Pane = new Pane({
        container: document.getElementById('paneContainer'),
    });

    pane.registerPlugin(EssentialsPlugin);

    const status = pane.addBlade({
        view: 'text',
        label: 'status',
        parse: (v:string) => String(v),
        value: 'loading...',
    });

    return {
        pane,
        status
    };
}

export default getPane;
