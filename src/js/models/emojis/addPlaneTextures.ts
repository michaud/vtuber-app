import {
    Mesh,
    MeshStandardMaterial,
    Object3D,
    TextureLoader
} from "three";
import paths from "constant/paths";
import { appConstants } from "constant/appConstants";

const addPlaneTextures = (
    imageList : Array<string>,
    planes : Array<Object3D>
) => {
    /* index < 17 right eye */
    const eyes = [33, 246, 161, 160, 159, 158, 157, 173, 133, 155, 154, 153, 145, 144, 163, 7, 243,
                    263, 466, 388, 387, 386, 385, 384, 398, 362, 381, 380, 374, 373, 390, 249, 463];
    const imageCount = imageList.length - 1;

    for (let i = 0; i < appConstants.NUM_KEYPOINTS; i++) {

        if (!eyes.includes(i)) {

            const rndImgIndex = Math.floor(Math.random() * imageCount);
            const fileName = imageList[rndImgIndex];
            const texture = new TextureLoader().load(
                `${paths.profilePics}${fileName}`
            );

            ((planes[i].children[0] as Mesh).material as MeshStandardMaterial).opacity = 1;
            ((planes[i].children[0] as Mesh).material as MeshStandardMaterial).map = texture;
        }
    }
};

export default addPlaneTextures;
