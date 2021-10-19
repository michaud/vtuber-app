import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { LuminosityShader } from 'three/examples/jsm/shaders/LuminosityShader.js';
import { SobelOperatorShader } from 'three/examples/jsm/shaders/SobelOperatorShader.js';
import { PassArguments } from "types/PassArguments";

const addSobolPass = ({
    composer,
    folder
} : PassArguments) => {

    const params = {
        sobol: false
    };

    /* color to grayscale conversion */
    const effectGrayScale = new ShaderPass(LuminosityShader);

    composer.addPass(effectGrayScale);

    const effectSobel = new ShaderPass(SobelOperatorShader);
    effectSobel.uniforms['resolution'].value.x = window.innerWidth * window.devicePixelRatio;
    effectSobel.uniforms['resolution'].value.y = window.innerHeight * window.devicePixelRatio;

    composer.addPass(effectSobel);

    effectSobel.enabled = params.sobol;
    effectGrayScale.enabled = params.sobol;

    const f = folder.addFolder({
        title: 'sobol',
        expanded: true,
    });

    f.addInput(params, 'sobol', { label: 'on'}).on('change',(ev)=> {
        effectGrayScale.enabled = Boolean(ev.value);
        effectSobel.enabled = Boolean(ev.value);
    });

    return composer;
};

export default addSobolPass;
