import FaceGeometry from "face/FaceGeometry";
import { GumAudioVideo } from "thirdparty/gum-av";
import { OrthographicCamera, WebGLRenderer } from "three";

const resize = (
    av:GumAudioVideo,
    camera:OrthographicCamera,
    faceGeometry:FaceGeometry,
    renderer:WebGLRenderer,
    canvas : HTMLCanvasElement
) => async () => {
    
    await av.ready();

    const w = av?.video?.videoWidth ?? 0;
    const h = av?.video?.videoHeight ?? 0;
    faceGeometry.setSize(w, h);

    camera.left = -0.5 * canvas.clientWidth;
    camera.right = 0.5 * canvas.clientWidth;
    camera.top = 0.5 * canvas.clientHeight;
    camera.bottom = -0.5 * canvas.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
}

export default resize;
