import { EffectPass } from "types/PostProcessing";
import { Vector2 } from "three";

import { FolderApi } from "tweakpane";
import { Uniforms } from "../composer/dotScreen/DotScreenShader";
import { DotScreenPass } from "../composer/dotScreen/DotScreenPass";

const addDotScreenUI = (
    folder : FolderApi,
    effectPass : EffectPass
) => {

    const f = folder.addFolder({
        title: 'dot screen',
        expanded: true,
    });

    f.addInput(effectPass.params, 'enabled', { label: 'on'}).on('change',(ev)=> {
        Boolean(ev.value) ?
            effectPass.add() :
            effectPass.remove()

        pass.enabled = Boolean(ev.value);
    });

    const pass = effectPass.passes['pass'] as DotScreenPass;

    const fparams = f.addFolder({
        title: 'params',
        expanded: false,
    });

    fparams.addInput(effectPass.params, 'centerX', {
        label: 'centerX',
        step: 0.1,
        min: 0.0,
        max: 1.0,
    }).on('change', (ev)=> pass.center.copy(
        new Vector2(
            Number(ev.value),
            pass.center.y
        ))
    )

    fparams.addInput(effectPass.params, 'centerY', {
        label: 'centerY',
        step: 0.1,
        min: 0.0,
        max: 1.0,
    }).on('change', (ev)=> pass.center.copy(
        new Vector2(
            pass.center.y,
            Number(ev.value)
        ))
    );

    fparams.addInput(effectPass.params, 'angle', {
        label: 'angle',
        step: 0.1,
        min: 0.0,
        max: Math.PI * 2,
    }).on(
        'change',
        (ev)=> pass.angle = Number(ev.value)
    );

    fparams.addInput(effectPass.params, 'scale', {
        label: 'scale',
        step: 0.1,
        min: 0.0,
        max: Math.PI * 2,
    }).on(
        'change',
        (ev)=> pass.scale = Number(ev.value)
    );
}

export default addDotScreenUI;
