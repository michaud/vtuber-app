import { OrthographicCamera, WebGLRenderer } from "three";
import { GumAudioVideo } from "../../../third_party/gum-av";
import FaceMeshFaceGeometry from "../face/FaceMeshFaceGeometry";

import resize from "./resize";

const setUpResize = (
    av : GumAudioVideo,
    camera : OrthographicCamera,
    faceGeometry : FaceMeshFaceGeometry,
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
