import { ShaderMaterial, Vector2 } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import frag from '../shader/shader.frag';
import vert from '../shader/shader.vert';

const addBloomPass = ({
    composer,
    renderScene,
    renderer,
    gui
}) => {
    
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

    passComposer.addPass( renderScene );
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

    gui.add( params, 'bloom').onChange( function ( value ) {
        finalPass.enabled = Boolean(value);
    });
    
    const folder = gui.addFolder( 'bloomParams' );
    
    folder.add( params, 'exposure', 0.1, 2 ).onChange( function ( value ) {
    
        renderer.toneMappingExposure = Math.pow( value, 4.0 );
    } );
    
    folder.add( params, 'bloomThreshold', 0.0, 1.0 ).onChange( function ( value ) {
    
        pass.threshold = Number( value );
    } );
    
    folder.add( params, 'bloomStrength', 0.0, 10.0 ).onChange( function ( value ) {
    
        pass.strength = Number( value );
    } );
    
    folder.add( params, 'bloomRadius', 0.0, 1.0 ).step( 0.01 ).onChange( function ( value ) {
    
        pass.radius = Number( value );
    } );

    composer.addPass(finalPass);
};

export default addBloomPass;
