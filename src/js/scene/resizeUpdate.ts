import FaceGeometry from "face/FaceGeometry";
import { GumAudioVideo } from "thirdparty/gum-av";
import { Camera, WebGLRenderer } from "three";
import { EffectPass, PostProcessingProps } from "types/PostProcessing";

import resize from "./resize";

const setUpResize = (
    av : GumAudioVideo,
    camera : Camera,
    faceGeometry : FaceGeometry,
    renderer : WebGLRenderer,
    canvas : HTMLCanvasElement,
    passes: Array<EffectPass>
) : void => {

    const resizeUpdate = resize(
        av,
        camera,
        faceGeometry,
        renderer,
        canvas,
        passes
    );

    window.addEventListener("resize", () => resizeUpdate());
    resizeUpdate();
};

export default setUpResize;
