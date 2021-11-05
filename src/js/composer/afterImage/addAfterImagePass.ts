import { PassArguments } from "types/PostProcessing";
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass';
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { Uniforms } from "../dotScreen/DotScreenShader";

const setSize = (pass : AfterimagePass) => (
    width: number,
    height: number
) => pass.setSize(width, height);

const addAfterImagePass = ({
    scene,
    camera,
    composer
} : PassArguments) => {

    const params = {
        enabled: false,
        damp: 0.5
    };

    const renderScene = new RenderPass( scene, camera );

    const pass = new AfterimagePass();
    (pass.uniforms as Uniforms)[ "damp" ].value = params.damp;
    composer.addPass(renderScene);
    composer.addPass(pass);
    composer.setSize(
        window.innerWidth,
        window.innerHeight
    );

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
        name: 'afterimagePass',
        params,
        passes: {
            pass
        },
        add,
        remove,
        setSize
    };
};

export default addAfterImagePass;
