import { EffectPass } from "types/PostProcessing";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { FolderApi } from "tweakpane";

const addSobolUI = (
    folder : FolderApi,
    effectPass : EffectPass
) => {

    const f = folder.addFolder({
        title: 'sobol',
        expanded: true,
    });

    const pass = effectPass.passes['pass'] as ShaderPass;

    f.addInput(effectPass.params, 'enabled', { label: 'on'}).on('change',(ev)=> {

        Boolean(ev.value) ? effectPass.add() : effectPass.remove()

        effectPass.passes['effectGrayScale'].enabled = Boolean(ev.value);
        pass.enabled = Boolean(ev.value);
    });
    
}

export default addSobolUI;
