import { PassArguments } from "types/PostProcessing";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";

const addGlitchPass = ({
    scene,
    camera,
    composer
} : PassArguments) => {

    const params = {
        enabled: false
    };

    const renderScene = new RenderPass( scene, camera );

    const pass = new GlitchPass();

    pass.enabled = params.enabled;

    const add = () => {

        composer.addPass(renderScene);
        composer.addPass(pass);
    }
    const remove = () => {

        composer.removePass(renderScene);
        composer.removePass(pass);
    }

    return {
        name: 'glitchPass',
        params,
        passes: {
            pass
        },
        add,
        remove
    };
};

export default addGlitchPass;
