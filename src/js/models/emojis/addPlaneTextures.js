import { TextureLoader } from "three";
import appConstants from "../../constants/appConstants";
import paths from "../../constants/paths";


const addPlaneTextures = (imageList, planes) => {
    /* index < 17 right eye */
    const eyes = [33, 246, 161, 160, 159, 158, 157, 173, 133, 155, 154, 153, 145, 144, 163, 7, 243,
                  263, 466, 388, 387, 386, 385, 384, 398, 362, 381, 380, 374, 373, 390, 249, 463];
    const imageCount = imageList.length - 1;

    for (let i = 0; i < appConstants.NUM_KEYPOINTS; i++) {

        if (!eyes.includes(i)) {

            const rndImgIndex = Math.floor(Math.random() * imageCount);
            const fileName = imageList[rndImgIndex];
            const texture = new TextureLoader().load(`${paths.profilePics}${fileName}`);

            planes[i].children[0].material.opacity = 1;
            planes[i].children[0].material.map = texture;
        }
    }
};

export default addPlaneTextures;
