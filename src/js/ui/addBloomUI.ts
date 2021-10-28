import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { FolderApi } from "tweakpane";
import { EffectPass } from "../composer/addComposer";

const addBloomUI = (
    folder : FolderApi,
    effectPass : EffectPass
) => {

    const f = folder.addFolder({
        title: 'bloom',
        expanded: true,
    });

    const pass = effectPass.passes['pass'] as UnrealBloomPass;
    const finalPass = effectPass.passes['finalPass'] as ShaderPass;

    f.addInput(effectPass.params, 'bloom', { label: 'on'}).on('change',(ev)=> {
        finalPass.enabled = Boolean(ev.value);
    });
    
    
    const fparams = f.addFolder({
        title: 'params',
        expanded: false,
    });

    fparams.addInput(effectPass.params, 'exposure', {
        label: 'exposure',
        step: 0.1,
        min: 0.1,
        max: 2,
    }).on(
        'change',
        (ev)=> effectPass.renderer.toneMappingExposure = Math.pow( <number>ev.value, 4.0 )
    );

    fparams.addInput(effectPass.params, 'bloomThreshold', {
        label: 'threshold',
        step: 0.1,
        min: 0.0,
        max: 1.0,
    }).on(
        'change',
        (ev)=> pass.threshold = Number(ev.value)
    );
    
    fparams.addInput(effectPass.params, 'bloomStrength', {
        label: 'strength',
        step: 0.1,
        min: 0.0,
        max: 10.0,
    }).on(
        'change',
        (ev)=> pass.strength = Number(ev.value)
    );

    fparams.addInput(effectPass.params, 'bloomRadius', {
        label: 'radius',
        step: 0.01,
        min: 0.0,
        max: 1.0,
    }).on(
        'change',
        (ev)=> pass.radius = Number(ev.value )
    );
}

export default addBloomUI;
