import FaceGeometry from "face/FaceGeometry";
import { GumAudioVideo } from "thirdparty/gum-av";
import { OrthographicCamera, WebGLRenderer } from "three";
import { EffectPass, PostProcessingProps } from "types/PostProcessing";

const resize = (
    av:GumAudioVideo,
    camera:OrthographicCamera,
    faceGeometry:FaceGeometry,
    renderer:WebGLRenderer,
    canvas : HTMLCanvasElement,
    passes : Array<EffectPass>
) => async () => {

    await av.ready();

    const w = av?.video?.videoWidth ?? 0;
    const h = av?.video?.videoHeight ?? 0;
    faceGeometry.setSize(w, h);

    const clientWidth = canvas.clientWidth;
    const clientHeight = canvas.clientHeight;

    camera.left = -0.5 * clientWidth;
    camera.right = 0.5 * clientWidth;
    camera.top = 0.5 * clientHeight;
    camera.bottom = -0.5 * clientHeight;
    camera.updateProjectionMatrix();

    const pass = passes.find(pass => pass.name === 'godRayPass');

    if(pass) {

        const godrayRenderTargetResolutionMultiplier = 1.0 / 4.0;
        pass.pp.rtTextureColors.setSize(clientWidth, clientHeight );
        pass.pp.rtTextureDepth.setSize( clientWidth, clientHeight );
        pass.pp.rtTextureDepthMask.setSize( clientWidth, clientHeight );

        const adjustedWidth = clientWidth * godrayRenderTargetResolutionMultiplier;
        const adjustedHeight = clientHeight * godrayRenderTargetResolutionMultiplier;
        pass.pp.rtTextureGodRays1.setSize( adjustedWidth, adjustedHeight );
        pass.pp.rtTextureGodRays2.setSize( adjustedWidth, adjustedHeight );
    }

    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
}

export default resize;
