import FaceGeometry from "face/FaceGeometry";
import { GumAudioVideo } from "thirdparty/gum-av";
import { OrthographicCamera, WebGLRenderer } from "three";

import resize from "./resize";

const setUpResize = (
    av : GumAudioVideo,
    camera : OrthographicCamera,
    faceGeometry : FaceGeometry,
    renderer : WebGLRenderer,
    canvas : HTMLCanvasElement
) : void => {

    const resizeUpdate = resize(
        av,
        camera,
        faceGeometry,
        renderer,
        canvas
    );

    window.addEventListener("resize", () => resizeUpdate());
    resizeUpdate();
};

export default setUpResize;
