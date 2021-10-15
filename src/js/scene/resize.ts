import { OrthographicCamera, WebGLRenderer } from "three";
import { GumAudioVideo } from "../../../third_party/gum-av";
import { FaceMeshFaceGeometry } from "../face/face";

const resize = (
    av:GumAudioVideo,
    camera:OrthographicCamera,
    faceGeometry:FaceMeshFaceGeometry,
    renderer:WebGLRenderer
) => async () => {
    
    await av.ready();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Resize orthographic camera to video dimensions if necessary.
    const w = av?.video?.videoWidth ?? 0;
    const h = av?.video?.videoHeight ?? 0;
    camera.left = -0.5 * w * ((w / h) + .1);
    camera.right = 0.5 * w * ((w / h) + .1);
    camera.top = 0.5 * h;
    camera.bottom = -0.5 * h;
    camera.updateProjectionMatrix();
    faceGeometry.setSize(w, h);

    const videoAspectRatio = w / h;

    const windowAspectRatio = windowWidth / windowHeight;

    let adjustedWidth;
    let adjustedHeight;

    if (videoAspectRatio > windowAspectRatio) {

        adjustedWidth = windowWidth;
        adjustedHeight = windowWidth / videoAspectRatio;

    } else {

        adjustedWidth = windowHeight * videoAspectRatio;
        adjustedHeight = windowHeight;
    }

    renderer.setSize(windowWidth, windowHeight);
}

export default resize;
