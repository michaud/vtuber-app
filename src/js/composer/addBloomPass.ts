import { ShaderMaterial, Vector2 } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
/* @ts-ignore */
import frag from '../shader/shader.frag';
/* @ts-ignore */
import vert from '../shader/shader.vert';
import { PassArguments } from "types/PostProcessing";

const addBloomPass = ({
    composer,
    renderer
} : PassArguments) => {
    
    const params = {
        exposure: 1,
        bloomStrength: 0,
        bloomThreshold: 0,
        bloomRadius: 1.0,
        bloom: false
    };
    
    const pass = new UnrealBloomPass(
        new Vector2( window.innerWidth, window.innerHeight ),
        1.5, 0.4, 0.85
    );

    pass.threshold = params.bloomThreshold;
    pass.strength = params.bloomStrength;
    pass.radius = params.bloomRadius;
    
    const passComposer = new EffectComposer( renderer );
    passComposer.renderToScreen = false;

    passComposer.addPass( pass );

    const finalPass = new ShaderPass(
        new ShaderMaterial( {
            uniforms: {
                baseTexture: { value: null },
                bloomTexture: { value: passComposer.renderTarget2.texture }
            },
            vertexShader: vert,
            fragmentShader: frag,
            defines: {}
        } ), "baseTexture"
    );

    finalPass.needsSwap = true;
    finalPass.enabled = params.bloom;

    composer.addPass(finalPass);

    return {
        name: 'bloomPass',
        params,
        passes: {
            pass,
            finalPass
        },
        renderer
    }
};

export default addBloomPass;
