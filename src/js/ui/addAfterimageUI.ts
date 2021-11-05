import { EffectPass } from "types/PostProcessing";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { FolderApi } from "tweakpane";
import { Uniforms } from "../composer/dotScreen/DotScreenShader";


const addAfterimageUI = (
    folder : FolderApi,
    effectPass : EffectPass
) => {

    const f = folder.addFolder({
        title: 'afterimage',
        expanded: true,
    });

    const pass = effectPass.passes['pass'] as ShaderPass;

    f.addInput(effectPass.params, 'enabled', { label: 'on'}).on('change',(ev)=> {

        Boolean(ev.value) ? effectPass.add() : effectPass.remove()
        pass.enabled = Boolean(ev.value);
    });

    f.addInput(effectPass.params, 'damp', {
        label: 'damp',
        step: 0.01,
        min: 0.0,
        max: 1.0,
    }).on('change',(ev)=> (pass.uniforms as Uniforms)[ "damp" ].value = Number(ev.value)
    )
    
}

export default addAfterimageUI;
