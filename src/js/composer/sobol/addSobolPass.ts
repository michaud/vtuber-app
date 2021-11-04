import { PassArguments } from "types/PostProcessing";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { LuminosityShader } from 'three/examples/jsm/shaders/LuminosityShader.js';
import { SobelOperatorShader } from 'three/examples/jsm/shaders/SobelOperatorShader.js';

const addSobolPass = ({
    composer
} : PassArguments) => {

    const params = {
        sobol: false,
        enabled: false
    };

    /* color to grayscale conversion */
    const effectGrayScale = new ShaderPass(LuminosityShader);

    composer.addPass(effectGrayScale);

    const pass = new ShaderPass(SobelOperatorShader);
    pass.uniforms['resolution'].value.x = window.innerWidth * window.devicePixelRatio;
    pass.uniforms['resolution'].value.y = window.innerHeight * window.devicePixelRatio;

    composer.addPass(pass);

    pass.enabled = params.sobol;
    pass.enabled = params.enabled;
    effectGrayScale.enabled = params.sobol;
    effectGrayScale.enabled = params.enabled;

    return {
        name: 'sobolPass',
        params,
        passes: {
            pass,
            effectGrayScale
        }
    };
};

export default addSobolPass;
