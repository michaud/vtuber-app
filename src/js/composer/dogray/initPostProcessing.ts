import {
    PostProcessingProps,
    TpParams
} from "types/PostProcessing";
import {
    LinearFilter,
    Mesh,
    OrthographicCamera,
    PlaneGeometry,
    RGBFormat,
    Scene,
    ShaderMaterial,
    Texture,
    UniformsUtils,
    WebGLRenderer,
    WebGLRenderTarget
} from "three";
import {
    GodRaysCombineShader,
    GodRaysDepthMaskShader,
    GodRaysFakeSunShader,
    GodRaysGenerateShader
} from "three/examples/jsm/shaders/GodRaysShader";

const initPostprocessing = (
    renderTargetWidth : number,
    renderTargetHeight : number,
    pp : PostProcessingProps,
    params: TpParams,
    renderer: WebGLRenderer
) => {

    // Use a smaller size for some of the god-ray render targets for better performance.
    const godrayRenderTargetResolutionMultiplier = 1.0 / 2.0;
    pp.scene = new Scene();

    pp.camera = new OrthographicCamera( - 0.5, 0.5, 0.5, - 0.5, - 10000, 10000 )

    pp.camera.position.z = params.cameraZ as number;

    pp.scene.add( pp.camera );

    const pars = {
        minFilter: LinearFilter,
        magFilter: LinearFilter,
        format: RGBFormat
    };

    pp.rtTextureColors = new WebGLRenderTarget(
        renderTargetWidth,
        renderTargetHeight,
        pars
    );

/*         Switching the depth formats to luminance from rgb doesn't seem to work. I didn't
    investigate further for now.
*/        // pars.format = LuminanceFormat;

/*         I would have this quarter size and use it as one of the ping-pong render
    targets but the aliasing causes some temporal flickering */

    pp.rtTextureDepth = new WebGLRenderTarget(
        renderTargetWidth,
        renderTargetHeight,
        pars
    );
    pp.rtTextureDepthMask = new WebGLRenderTarget(
        renderTargetWidth,
        renderTargetHeight,
        pars
    );

    /* The ping-pong render targets can use an adjusted resolution to minimize cost */

    const adjustedWidth = renderTargetWidth * godrayRenderTargetResolutionMultiplier;
    const adjustedHeight = renderTargetHeight * godrayRenderTargetResolutionMultiplier;

    pp.rtTextureGodRays1 = new WebGLRenderTarget(
        adjustedWidth,
        adjustedHeight,
        pars
    );
    pp.rtTextureGodRays2 = new WebGLRenderTarget(
        adjustedWidth,
        adjustedHeight,
        pars
    );

    /* god-ray shaders */

    const godraysMaskShader = GodRaysDepthMaskShader;
    pp.godrayMaskUniforms = UniformsUtils.clone( godraysMaskShader.uniforms );
    pp.materialGodraysDepthMask = new ShaderMaterial({

        uniforms: pp.godrayMaskUniforms,
        vertexShader: godraysMaskShader.vertexShader,
        fragmentShader: godraysMaskShader.fragmentShader
    });

    const godraysGenShader = GodRaysGenerateShader;
    pp.godrayGenUniforms = UniformsUtils.clone( godraysGenShader.uniforms );
    pp.materialGodraysGenerate = new ShaderMaterial({

        uniforms: pp.godrayGenUniforms,
        vertexShader: godraysGenShader.vertexShader,
        fragmentShader: godraysGenShader.fragmentShader

    });

    const godraysCombineShader = GodRaysCombineShader;
    pp.godrayCombineUniforms = UniformsUtils.clone(
        godraysCombineShader.uniforms
    );

    pp.materialGodraysCombine = new ShaderMaterial({

        uniforms: pp.godrayCombineUniforms,
        vertexShader: godraysCombineShader.vertexShader,
        fragmentShader: godraysCombineShader.fragmentShader

    });

    const godraysFakeSunShader = GodRaysFakeSunShader;
    pp.godraysFakeSunUniforms = UniformsUtils.clone(
        godraysFakeSunShader.uniforms
    );

    pp.materialGodraysFakeSun = new ShaderMaterial({
        uniforms: pp.godraysFakeSunUniforms,
        vertexShader: godraysFakeSunShader.vertexShader,
        fragmentShader: godraysFakeSunShader.fragmentShader

    });

    pp.godraysFakeSunUniforms.bgColor.value.setHex( params.bgColor );
    pp.godraysFakeSunUniforms.sunColor.value.setHex( params.sunColor );

    pp.godrayCombineUniforms.fGodRayIntensity.value = params.intensity;

    pp.quad = new Mesh(
        new PlaneGeometry( 1.0, 1.0 ),
        pp.materialGodraysGenerate
    );
    pp.quad.position.z = - 9900;
    pp.scene.add( pp.quad );
}

export default initPostprocessing;
