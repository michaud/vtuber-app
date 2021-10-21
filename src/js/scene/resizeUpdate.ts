import FaceGeometry from "face/FaceGeometry";
import { OrthographicCamera, WebGLRenderer } from "three";
import { GumAudioVideo } from "../../../third_party/gum-av";

import resize from "./resize";

const setUpResize = (
    av : GumAudioVideo,
    camera : OrthographicCamera,
    faceGeometry : FaceGeometry,
    renderer : WebGLRenderer
) : void => {

    const resizeUpdate = resize(
        av,
        camera,
        faceGeometry,
        renderer
    );

    window.addEventListener("resize", () => resizeUpdate());
    resizeUpdate();
};

export default setUpResize;
