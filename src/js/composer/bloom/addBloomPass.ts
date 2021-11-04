import { PassArguments } from "types/PostProcessing";
import { ShaderMaterial, Vector2 } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
/* @ts-ignore */
import frag from './shader/shader.frag';
/* @ts-ignore */
import vert from './shader/shader.vert';
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";

const setSize = (pass : UnrealBloomPass) => (
    width: number,
    height: number
) => pass.resolution = new Vector2(width, height);

const addBloomPass = ({
    composer,
    renderer,
    camera,
    scene
} : PassArguments) => {

    const params = {
        exposure: renderer.toneMappingExposure,
        bloomStrength: 1.5,
        bloomThreshold: 0.85,
        bloomRadius: 0.4,
        bloom: false,
        enabled: false
    };

    const renderScene = new RenderPass( scene, camera );

    const pass = new UnrealBloomPass(
        new Vector2(
            window.innerWidth,
            window.innerHeight
        ),
        params.bloomStrength,
        params.bloomRadius,
        params.bloomThreshold
    );

    pass.enabled = params.bloom;
    pass.enabled = params.enabled;

    const passComposer = new EffectComposer( renderer );
    passComposer.renderToScreen = false;
    passComposer.addPass( renderScene );
    passComposer.addPass( pass );
    passComposer.setSize(
        window.innerWidth,
        window.innerHeight
    )

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

    composer.addPass( renderScene );
    composer.addPass( finalPass );

    return {
        name: 'bloomPass',
        params,
        passes: {
            pass,
            finalPass
        },
        renderer,
        composer,
        passComposer,
        setSize: setSize(pass)
    }
};

export default addBloomPass;
