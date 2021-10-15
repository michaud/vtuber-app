import { ShaderMaterial, Vector2 } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
/* @ts-ignore */
import frag from '../shader/shader.frag';
/* @ts-ignore */
import vert from '../shader/shader.vert';
import { PassArguments } from "../types/PassArguments";

const addBloomPass = ({
    composer,
    renderer,
    folder
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


    const f = folder.addFolder({
        title: 'bloom',
        expanded: true,
    });

    f.addInput(params, 'bloom', { label: 'on'}).on('change',(ev)=> {
        finalPass.enabled = Boolean(ev.value);
    });
    
    
    const fparams = f.addFolder({
        title: 'params',
        expanded: false,
    });

    fparams.addInput(params, 'exposure', {
        label: 'exposure',
        step: 0.1,
        min: 0.1,
        max: 2,
    }).on(
        'change',
        (ev)=> renderer.toneMappingExposure = Math.pow( ev.value, 4.0 )
    );

    fparams.addInput(params, 'bloomThreshold', {
        label: 'threshold',
        step: 0.1,
        min: 0.0,
        max: 1.0,
    }).on(
        'change',
        (ev)=> pass.threshold = Number(ev.value)
    );
    
    fparams.addInput(params, 'bloomStrength', {
        label: 'strength',
        step: 0.1,
        min: 0.0,
        max: 10.0,
    }).on(
        'change',
        (ev)=> pass.strength = Number(ev.value)
    );

    fparams.addInput(params, 'bloomRadius', {
        label: 'radius',
        step: 0.01,
        min: 0.0,
        max: 1.0,
    }).on(
        'change',
        (ev)=> pass.radius = Number(ev.value )
    );

    composer.addPass(finalPass);
};

export default addBloomPass;
