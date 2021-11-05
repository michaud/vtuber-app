import { EffectPass } from "types/PostProcessing";
import FaceGeometry from "face/FaceGeometry";
import { GumAudioVideo } from "thirdparty/gum-av";
import { Camera, OrthographicCamera, WebGLRenderer } from "three";

const resize = (
    av:GumAudioVideo,
    camera:Camera,
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

    if(camera.type === 'OrthographicCamera') {

        const cam = (camera as OrthographicCamera);

        cam.left = -0.5 * clientWidth;
        cam.right = 0.5 * clientWidth;
        cam.top = 0.5 * clientHeight;
        cam.bottom = -0.5 * clientHeight;
        cam.updateProjectionMatrix();
    }

    passes.forEach(pass => pass?.setSize?.(clientWidth, clientHeight));

    const pass = passes.find(pass => pass.name === 'godRayPass');

    if(pass) {

        const godrayRenderTargetResolutionMultiplier = 1.0 / 2.0;
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
