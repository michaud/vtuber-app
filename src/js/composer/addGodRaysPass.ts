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

const addGodRaysPass = ({
    composer,
    renderer,
    camera,
    scene
} : PassArguments) => {

    const params = {
        godray: false,
        sunX: 0,
        sunY: 1000,
        sunZ: -1000,
        cameraZ: 100,
        bgColor: 0x000511,
        sunColor: 0xffee00,
        intensity: 0.75,
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

    renderer.autoClear = false;

    initPostprocessing(
        window.innerWidth,
        window.innerHeight,
        pp,
        params,
        renderer
    );

    const render = () => {

        if(params.godray) {

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

            renderer.setRenderTarget( pp.rtTextureColors );
            renderer.clear( true, true, false );

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

            renderer.setScissor(
                screenSpacePosition.x - sunsqW / 2,
                screenSpacePosition.y - sunsqH / 2,
                sunsqW,
                sunsqH
            );
            
            renderer.setScissorTest( true );

            pp.godraysFakeSunUniforms[ "fAspect" ]
                .value = window.innerWidth / window.innerHeight;

            pp.scene.overrideMaterial = pp.materialGodraysFakeSun;
            renderer.setRenderTarget( pp.rtTextureColors );
            renderer.render( pp.scene, pp.camera );

            renderer.setScissorTest( false );

            /* -- Draw scene objects -- */

            /* Colors */

            scene.overrideMaterial = null;
            renderer.setRenderTarget( pp.rtTextureColors );
            renderer.render( scene, camera );

            /* Depth */

            scene.overrideMaterial = materialDepth;
            renderer.setRenderTarget( pp.rtTextureDepth );
            renderer.clear();
            renderer.render( scene, camera );

            pp.godrayMaskUniforms[ "tInput" ].value = pp.rtTextureDepth.texture;

            pp.scene.overrideMaterial = pp.materialGodraysDepthMask;
            renderer.setRenderTarget( pp.rtTextureDepthMask );
            renderer.render( pp.scene, pp.camera );

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
                renderer
            );

            /* pass 2 - render into second ping-pong target */
            filterGodRays(
                pp.rtTextureGodRays2.texture,
                pp.rtTextureGodRays1,
                getStepSize( filterLen, TAPS_PER_PASS, 2.0 ),
                pp,
                renderer
            );

            /* pass 3 - 1st RT */
            filterGodRays(
                pp.rtTextureGodRays1.texture,
                pp.rtTextureGodRays2,
                getStepSize( filterLen, TAPS_PER_PASS, 3.0 ),
                pp,
                renderer
            );

            /* final pass - composite god-rays onto colors */

            pp.godrayCombineUniforms[ "tColors" ].value = pp.rtTextureColors.texture;
            pp.godrayCombineUniforms[ "tGodRays" ].value = pp.rtTextureGodRays2.texture;

            pp.scene.overrideMaterial = pp.materialGodraysCombine;

            renderer.setRenderTarget( null );
            renderer.render( pp.scene, pp.camera );
            pp.scene.overrideMaterial = null;

        } else {

            renderer.setRenderTarget( null );
            renderer.clear();
            renderer.render( scene, camera );
        }
    }

    return {
        name: 'godRayPass',
        params,
        render,
        pp
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
