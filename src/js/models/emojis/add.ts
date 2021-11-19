import { Update } from 'types/Update';
import { Model } from 'types/Model';
import {
    TextureLoader,
    Mesh,
    DoubleSide,
    MeshStandardMaterial,
    Group,
    CircleGeometry,
    Object3D,
    Texture
} from 'three';

import addActions from '../addActions';
import addPlaneTextures from "./addPlaneTextures";
import actionDefinitions from './actionDefinitions';
import updateAction from './updateAction';
import modelUpdate from '../modelUpdate';

import paths from 'constant/paths';
import { appConstants } from 'constant/appConstants';
import { SceneCreator } from 'types/SceneCreator';

export const add : SceneCreator = (scene) => {

    const updateActions : Array<Update> = [];
    const mesh : Array<Object3D> = [];

    const model : Model = {
        create: null,
        update: modelUpdate(
            updateActions,
            { mesh }
        ),
        name: 'emojis',
        actions: {},
        mesh,
        active: false
    }

    const imageList : Array<string> = [
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


    model.create = () => {

        const emojiGroup : Group = new Group();
        emojiGroup.name = model.name;
 
        for (let i = 0; i < appConstants.NUM_KEYPOINTS; i++) {
        
            const texture : Texture = new TextureLoader().load(
                `${paths.profilePics}empty.png`
            );

            const geometry : CircleGeometry = new CircleGeometry(.66, 36);
            const material : MeshStandardMaterial = new MeshStandardMaterial({
                side: DoubleSide,
                flatShading: true,
                map: texture,
                transparent: true,
                opacity: 0.0
            });
        
            const plane : Mesh = new Mesh(geometry, material);
            plane.frustumCulled = false;

            /* isolate for transforms */
            const group : Group = new Group();

            group.add(plane);
            group.scale.setScalar(10);
            mesh.push(group);
            emojiGroup.add(group);
        }
        
        scene.add(emojiGroup);

        addPlaneTextures(
            imageList,
            mesh
        );

        updateActions.push(
            updateAction(
                updateActions,
                { mesh }
            )
        );

        model.active = true;
    };

    const { actions } = addActions({
            updateActions,
            mesh,
        },
        actionDefinitions
    );

    model.actions = actions;

    return model
};
