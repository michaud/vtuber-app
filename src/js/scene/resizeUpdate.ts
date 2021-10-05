import { OrthographicCamera, WebGLRenderer } from "three";
import { FaceMeshFaceGeometry } from "../face/face";
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
