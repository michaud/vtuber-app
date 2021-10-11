import { DataTexture, PMREMGenerator, Scene, Texture } from "three";

export const RGBELoaderCallback = (
    scene : Scene,
    pmremGenerator : PMREMGenerator
) => (
    texture : DataTexture
) => {

    const envMap : Texture = pmremGenerator.fromEquirectangular(texture).texture;

    //scene.background = envMap;
    scene.environment = envMap;

    texture.dispose();
    pmremGenerator.dispose();
};
