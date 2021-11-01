import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { FolderApi } from "tweakpane";
import { EffectPass } from "types/PostProcessing";

const addSobolUI = (
    folder : FolderApi,
    effectPass : EffectPass
) => {

    const f = folder.addFolder({
        title: 'sobol',
        expanded: true,
    });

    const pass = effectPass.passes['pass'] as ShaderPass;

    f.addInput(effectPass.params, 'sobol', { label: 'on'}).on('change',(ev)=> {
        effectPass.passes['effectGrayScale'].enabled = Boolean(ev.value);
        pass.enabled = Boolean(ev.value);
    });
    
}

export default addSobolUI;
