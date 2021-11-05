import { EffectPass } from "types/PostProcessing";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { FolderApi } from "tweakpane";

const addGlitchUI = (
    folder : FolderApi,
    effectPass : EffectPass
) => {

    const f = folder.addFolder({
        title: 'glitch',
        expanded: true,
    });

    const pass = effectPass.passes['pass'] as ShaderPass;

    f.addInput(effectPass.params, 'enabled', { label: 'on'}).on('change',(ev)=> {

        Boolean(ev.value) ? effectPass.add() : effectPass.remove()
        pass.enabled = Boolean(ev.value);
    });
    
}

export default addGlitchUI;
