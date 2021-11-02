import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { FolderApi } from "tweakpane";
import { EffectPass } from "types/PostProcessing";

const addGodRayUI = (
    folder : FolderApi,
    effectPass : EffectPass
) => {

    const f = folder.addFolder({
        title: 'godray',
        expanded: true,
    });

    f.addInput(effectPass.params, 'godray', { label: 'on'})

    const fparams = f.addFolder({
        title: 'params',
        expanded: false,
    });

    fparams.addInput(effectPass.params, 'sunX', {
        label: 'sun x',
        step: 1,
        min: -1000,
        max: 1000,
    })

    fparams.addInput(effectPass.params, 'sunY', {
        label: 'sun y',
        step: 1,
        min: -1000,
        max: 1000,
    })

    fparams.addInput(effectPass.params, 'sunZ', {
        label: 'sun z',
        step: 1,
        min: -1000,
        max: 1000,
    })

    fparams.addInput(effectPass.params, 'cameraZ', {
        label: 'camera z',
        step: 1,
        min: -1000,
        max: 1000,
    })

    fparams.addInput(effectPass.params, 'bgColor', {
        label: 'background',
        view: 'color'
    })

    fparams.addInput(effectPass.params, 'sunColor', {
        label: 'background',
        view: 'color'
    })

    fparams.addInput(effectPass.params, 'intensity', {
        label: 'intensity',
        step: .1,
        min: 0,
        max: 100,
    })

    fparams.addInput(effectPass.params, 'rayLength', {
        label: 'length',
        step: .01,
        min: 0,
        max: 1,
    })
}

export default addGodRayUI;
