import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { LuminosityShader } from 'three/examples/jsm/shaders/LuminosityShader.js';
import { SobelOperatorShader } from 'three/examples/jsm/shaders/SobelOperatorShader.js';

const addSobolPass = ({
    composer,
    renderScene,
    gui
}) => {

    const params = {
        sobol: false
    };

    /* color to grayscale conversion */
    const effectGrayScale = new ShaderPass(LuminosityShader);

    composer.addPass( renderScene );
    composer.addPass(effectGrayScale);

    effectSobel = new ShaderPass(SobelOperatorShader);
    effectSobel.uniforms['resolution'].value.x = window.innerWidth * window.devicePixelRatio;
    effectSobel.uniforms['resolution'].value.y = window.innerHeight * window.devicePixelRatio;

    composer.addPass(effectSobel);

    effectSobel.enabled = params.sobol;
    effectGrayScale.enabled = params.sobol;

    gui.add( params, 'sobol').onChange( function ( value ) {

        effectGrayScale.enabled = Boolean(value);
        effectSobel.enabled = Boolean(value);
    });

    return composer;
};

export default addSobolPass;
