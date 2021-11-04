import { EffectPass } from "types/PostProcessing";
import { Vector2 } from "three";
import { DotScreenPass } from "three/examples/jsm/postprocessing/DotScreenPass";
import { FolderApi } from "tweakpane";
import { Uniforms, Vector2Value } from "../composer/dotScreen/DotScreenShader";

const addDotScreenUI = (
    folder : FolderApi,
    effectPass : EffectPass
) => {

    const f = folder.addFolder({
        title: 'dot screen',
        expanded: true,
    });

    f.addInput(effectPass.params, 'enabled', { label: 'on'}).on('change',(ev)=> {
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
    }).on('change', (ev)=> {

        ((pass.uniforms as Uniforms)['center'] as Vector2Value).value.copy(
            new Vector2(
                Number(ev.value),
                ((pass.uniforms as Uniforms)['center'] as Vector2Value).value.y
            )
        );
    })

    fparams.addInput(effectPass.params, 'centerY', {
        label: 'centerY',
        step: 0.1,
        min: 0.0,
        max: 1.0,
    }).on('change', (ev)=> {
        ((pass.uniforms as Uniforms)['center'] as Vector2Value).value.copy(
            new Vector2(
                ((pass.uniforms as Uniforms)['center'] as Vector2Value).value.x,
                Number(ev.value)
            )
        );
    });

    fparams.addInput(effectPass.params, 'angle', {
        label: 'angle',
        step: 0.1,
        min: 0.0,
        max: Math.PI * 2,
    }).on(
        'change',
        (ev)=> (pass.uniforms as Uniforms)['angle'].value = Number(ev.value)
    );

    fparams.addInput(effectPass.params, 'scale', {
        label: 'scale',
        step: 0.1,
        min: 0.0,
        max: Math.PI * 2,
    }).on(
        'change',
        (ev)=> (pass.uniforms as Uniforms)['scale'].value = Number(ev.value)
    );
}

export default addDotScreenUI;
