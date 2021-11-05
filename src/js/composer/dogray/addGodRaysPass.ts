import {
    PassArguments,
    PostProcessingProps
} from "types/PostProcessing";
import {
    MeshDepthMaterial,
    Texture,
    Vector3,
    Vector4,
    WebGLRenderer,
    WebGLRenderTarget
} from "three";
import getStepSize from "./getStepSize";
import initPostprocessing from "./initPostProcessing";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";

const addGodRaysPass = ({
    composer,
    renderer,
    camera,
    scene
} : PassArguments) => {

    const params = {
        godray: false,
        enabled: false,
        sunX: -2390,
        sunY: 1500,
        sunZ: 0,
        cameraZ: 100,
        bgColor: 0x000511,
        sunColor: 0x4a56b3,
        intensity: 0.25,
        rayLength: 1.0
    };

    const clipPosition = new Vector4();
    const screenSpacePosition = new Vector3();
    let materialDepth = new MeshDepthMaterial();

    const pp : PostProcessingProps = {
        scene: null,
        camera: null,
        rtTextureColors: null,
        rtTextureDepth: null,
        rtTextureDepthMask: null,
        rtTextureGodRays1: null,
        rtTextureGodRays2: null,
        godrayMaskUniforms: null,
        materialGodraysDepthMask: null,
        godrayGenUniforms: null,
        materialGodraysGenerate: null,
        godrayCombineUniforms: null,
        materialGodraysCombine: null,
        godraysFakeSunUniforms: null,
        materialGodraysFakeSun: null,
        quad: null
    };

    const renderScene = new RenderPass( scene, camera );

    const passComposer = new EffectComposer( renderer );
    passComposer.renderToScreen = false;
    passComposer.addPass( renderScene );


    passComposer.renderer.autoClear = false;

    initPostprocessing(
        window.innerWidth,
        window.innerHeight,
        pp,
        params
    );

    const render = () => {

        if(params.enabled) {

            pp.godraysFakeSunUniforms.bgColor.value.setHex( params.bgColor );
            pp.godraysFakeSunUniforms.sunColor.value.setHex( params.sunColor );
            pp.godrayCombineUniforms.fGodRayIntensity.value = params.intensity;

            pp.camera.position.z = params.cameraZ as number;

            clipPosition.x = params.sunX as number;
            clipPosition.y = params.sunY as number;
            clipPosition.z = params.sunZ as number;
            clipPosition.w = 1;

            clipPosition.applyMatrix4(
                camera.matrixWorldInverse
            ).applyMatrix4( camera.projectionMatrix );

            /* perspective divide (produce NDC space) */

            clipPosition.x /= clipPosition.w;
            clipPosition.y /= clipPosition.w;

            /* transform from [-1,1] to [0,1] */
            screenSpacePosition.x = ( clipPosition.x + 1 ) / 2;
            /* transform from [-1,1] to [0,1] */
            screenSpacePosition.y = ( clipPosition.y + 1 ) / 2;
            /* needs to stay in clip space for visibilty checks */
            screenSpacePosition.z = clipPosition.z;

            /* Give it to the god-ray and sun shaders */
            pp.godrayGenUniforms[ "vSunPositionScreenSpace" ]
                .value.copy( screenSpacePosition );
            pp.godraysFakeSunUniforms[ "vSunPositionScreenSpace" ]
                .value.copy( screenSpacePosition );

            /* -- Draw sky and sun -- */

            /* Clear colors and depths, will clear to sky color */

            passComposer.renderer.setRenderTarget( pp.rtTextureColors );
            passComposer.renderer.clear( true, true, false );

/*             Sun render. Runs a shader that gives a brightness based on the screen
            space distance to the sun. Not very efficient, so i make a scissor
            rectangle around the suns position to avoid rendering surrounding pixels.
 */
            /* 0.74 depends on extent of sun from shader */
            const sunsqH = 0.74 * window.innerHeight;
            /* both depend on height because sun is aspect-corrected */
            const sunsqW = 0.74 * window.innerHeight;

            screenSpacePosition.x *= window.innerWidth;
            screenSpacePosition.y *= window.innerHeight;

            passComposer.renderer.setScissor(
                screenSpacePosition.x - sunsqW / 2,
                screenSpacePosition.y - sunsqH / 2,
                sunsqW,
                sunsqH
            );
            
            passComposer.renderer.setScissorTest( true );

            pp.godraysFakeSunUniforms[ "fAspect" ]
                .value = window.innerWidth / window.innerHeight;

            pp.scene.overrideMaterial = pp.materialGodraysFakeSun;
            passComposer.renderer.setRenderTarget( pp.rtTextureColors );
            passComposer.renderer.render( pp.scene, pp.camera );

            passComposer.renderer.setScissorTest( false );

            /* -- Draw scene objects -- */

            /* Colors */

            scene.overrideMaterial = null;
            passComposer.renderer.setRenderTarget( pp.rtTextureColors );
            passComposer.renderer.render( scene, camera );

            /* Depth */

            scene.overrideMaterial = materialDepth;
            passComposer.renderer.setRenderTarget( pp.rtTextureDepth );
            passComposer.renderer.clear();
            passComposer.renderer.render( scene, camera );

            pp.godrayMaskUniforms[ "tInput" ].value = pp.rtTextureDepth.texture;

            pp.scene.overrideMaterial = pp.materialGodraysDepthMask;
            passComposer.renderer.setRenderTarget( pp.rtTextureDepthMask );
            passComposer.renderer.render( pp.scene, pp.camera );

            /*  -- Render god-rays -- */

            /* Maximum length of god-rays (in texture space [0,1]X[0,1]) */

            const filterLen = params.rayLength as number;

            /* Samples taken by filter */

            const TAPS_PER_PASS = 6.0;

/*             Pass order could equivalently be 3,2,1 (instead of 1,2,3), which
            would start with a small filter support and grow to large. however
            the large-to-small order produces less objectionable aliasing artifacts that
            appear as a glimmer along the length of the beams
 */
            /* pass 1 - render into first ping-pong target */
            filterGodRays(
                pp.rtTextureDepthMask.texture,
                pp.rtTextureGodRays2,
                getStepSize( filterLen, TAPS_PER_PASS, 1.0 ),
                pp,
                passComposer.renderer
            );

            /* pass 2 - render into second ping-pong target */
            filterGodRays(
                pp.rtTextureGodRays2.texture,
                pp.rtTextureGodRays1,
                getStepSize( filterLen, TAPS_PER_PASS, 2.0 ),
                pp,
                passComposer.renderer
            );

            /* pass 3 - 1st RT */
            filterGodRays(
                pp.rtTextureGodRays1.texture,
                pp.rtTextureGodRays2,
                getStepSize( filterLen, TAPS_PER_PASS, 3.0 ),
                pp,
                passComposer.renderer
            );

            /* final pass - composite god-rays onto colors */

            pp.godrayCombineUniforms[ "tColors" ].value = pp.rtTextureColors.texture;
            pp.godrayCombineUniforms[ "tGodRays" ].value = pp.rtTextureGodRays2.texture;

            pp.scene.overrideMaterial = pp.materialGodraysCombine;

            passComposer.renderer.setRenderTarget( null );
            passComposer.renderer.render( pp.scene, pp.camera );
            pp.scene.overrideMaterial = null;

        }
    }

    const reset = () => {
        scene.overrideMaterial = null;
        passComposer.renderer.setRenderTarget( null );
    };

    return {
        name: 'godRayPass',
        params,
        render,
        pp,
        reset
    };
};

const filterGodRays = (
    inputTex : Texture,
    renderTarget : WebGLRenderTarget,
    stepSize :number,
    pp: PostProcessingProps,
    renderer : WebGLRenderer
) => {

    pp.scene.overrideMaterial = pp.materialGodraysGenerate;

    pp.godrayGenUniforms[ "fStepSize" ].value = stepSize;
    pp.godrayGenUniforms[ "tInput" ].value = inputTex;

    renderer.setRenderTarget( renderTarget );
    renderer.render( pp.scene, pp.camera );
    pp.scene.overrideMaterial = null;
}

export default addGodRaysPass;
