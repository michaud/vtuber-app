import {
    LoadingManager,
    PMREMGenerator,
    Scene,
    UnsignedByteType,
    WebGLRenderer
} from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import paths from "../constants/paths";
import { RGBELoaderCallback } from "./RGBELoading";

const addHDR = (
    scene : Scene,
    renderer : WebGLRenderer
) => {

    const rgbeLoadManager : LoadingManager = new LoadingManager();
    const RGBELoad : RGBELoader = new RGBELoader(rgbeLoadManager)
        .setDataType(UnsignedByteType)
        .setPath(paths.hdr);

    const pmremGenerator : PMREMGenerator = new PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    RGBELoad.load(
        'vintage_measuring_lab_1k.hdr',
        RGBELoaderCallback(scene, pmremGenerator)
    );
}

export default addHDR;
