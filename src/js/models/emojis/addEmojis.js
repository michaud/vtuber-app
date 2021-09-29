import {
    TextureLoader,
    Mesh,
    DoubleSide,
    MeshStandardMaterial,
    Group,
    CircleGeometry
} from 'three';

import appConstants from '../../constants/appConstants.js';

import paths from "../../constants/paths";

import addActions from '../addActions.js';
import addPlaneTextures from "./addPlaneTextures.js";
import emojisActionDefinitions from './emojisActionDefinitions.js';
import updateEmojisAction from './updateEmojisAction.js';

const addEmojis = (scene, _, faceGeometry) => {

    const mesh = [];
    const updateActions = [];

    const imageList = [
        "5eed3a1b-ad65-48b5-9923-cb401656e7ae-profile_image-70x70.png",
        "hahaball.png",
        "pomo.png",
        "70e0790f-24d9-437a-bf38-f5414d67654f-profile_image-70x70.png",
        "a4c15b5f-e96a-4b1f-ac76-d2e5285b8091-profile_image-70x70.png",
        "2b383a6c-5c03-40cb-8a36-6903a0752788-profile_image-70x70.png",
        "c2b427fb5fb96dad6ac1e3134f1f16c3.png",
        "black_tomcat.png",
        "club_mate_enjoyer.png",
        "cryogi.png",
        "dario.png",
        "exodiquas.png",
        "fisken.png",
        "nerosnm_kermit.png",
        "ninthRoad.png",
        "omg_mum.png",
        "rexroof.png",
        "theidofalan.png",
        "nyxiatve.png"
    ];

    const create = () => {

        for (let i = 0; i < appConstants.NUM_KEYPOINTS; i++) {
        
            const texture = new TextureLoader().load(`${paths.profilePics}empty.png`);

            const geometry = new CircleGeometry(.66, 36);
            const material = new MeshStandardMaterial({
                side: DoubleSide,
                map: texture,
                transparent: true,
                opacity: 0.0
            });
        
            const plane = new Mesh(geometry, material);
            plane.frustumCulled = false;

            /* isolate for transforms */
            const group = new Group();

            group.add(plane);
            group.scale.setScalar(10);
            mesh.push(group);
            scene.add(group);
        }

        addPlaneTextures(
            imageList,
            mesh
        );

        updateActions.push(
            updateEmojisAction(
                updateActions,
                mesh
            )
        );
    };

    const update = (geom, moment) => {

        if(mesh.length === 0) return;
        
        updateActions.map(action => action(geom, moment));
    };

    const { actions } = addActions(
        updateActions,
        mesh,
        emojisActionDefinitions
    );

    return {
        create,
        update,
        name: 'emojis',
        actions,
        mesh
    };
};

export default addEmojis;
