import { TrackData } from 'types/TrackData';
import { Update } from 'types/Update';
import { Vector3 } from 'three';
import {
    faceFeatureMapping,
    faceFeatureScaleFactor,
    FeatureMapping
} from './faceFeatureMapping';
import { appConstants } from 'constant/appConstants';
import { Action } from 'types/Action';

const getScaleFactorForIndex = (
    i : number,
    faceFeatureMapping : FeatureMapping
) => {

    let scaleFactor : number = 1;

    Object.keys(faceFeatureMapping).forEach(key => {
        if(faceFeatureMapping[key].indexOf(i) > -1) {
            scaleFactor = faceFeatureScaleFactor[key];
        }
    });

    return scaleFactor;
};

const updateAction : Action = (
    _actionList,
    {
        mesh
    }
) => {
    const emojisUpdate : Update = ({
        geom,
        points,
        normals,
        faceTrackindeces,
        scale
    }) => {

        const [one, two, three] = faceTrackindeces;

        const track : TrackData = geom.track(one, two, three);

        for (let i = 0; i < appConstants.NUM_KEYPOINTS; i++) {

            mesh[i].position.set(
                points.array[i * 3],
                points.array[(i * 3) + 1],
                points.array[(i * 3) + 2]
            );

            const pos = new Vector3(
                points.array[i * 3],
                points.array[(i * 3) + 1],
                points.array[(i * 3) + 2]
            );

            const norm = new Vector3(
                normals.array[i * 3],
                normals.array[(i * 3) + 1],
                normals.array[(i * 3) + 2]
            );

            norm.add(pos);
            geom.attributes.position.needsUpdate = true;
            const scaleFactor = getScaleFactorForIndex(i, faceFeatureMapping);
            mesh[i].scale.setScalar(scale * scaleFactor * track.scale);
            mesh[i].lookAt(norm);
        }
    };

    return emojisUpdate;
};

export default updateAction;
