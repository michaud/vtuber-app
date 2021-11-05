import { PassArguments } from "types/PostProcessing";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { LuminosityShader } from 'three/examples/jsm/shaders/LuminosityShader.js';
import { SobelOperatorShader } from 'three/examples/jsm/shaders/SobelOperatorShader.js';
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";

const addSobolPass = ({
    scene,
    camera,
    composer
} : PassArguments) => {

    const params = {
        enabled: false
    };

    const renderScene = new RenderPass( scene, camera );

    /* color to grayscale conversion */
    const effectGrayScale = new ShaderPass(LuminosityShader);

    const pass = new ShaderPass(SobelOperatorShader);
    pass.uniforms['resolution'].value.x = window.innerWidth * window.devicePixelRatio;
    pass.uniforms['resolution'].value.y = window.innerHeight * window.devicePixelRatio;

    pass.enabled = params.enabled;
    effectGrayScale.enabled = params.enabled;

    const add = () => {

        composer.addPass(renderScene);
        composer.addPass(effectGrayScale);
        composer.addPass(renderScene);
        composer.addPass(pass);
    }
    const remove = () => {

        composer.removePass(renderScene);
        composer.removePass(effectGrayScale);
        composer.removePass(renderScene);
        composer.removePass(pass);
    }

    return {
        name: 'sobolPass',
        params,
        passes: {
            pass,
            effectGrayScale
        },
        add,
        remove
    };
};

export default addSobolPass;
