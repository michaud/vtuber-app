import FaceGeometry from "face/FaceGeometry";
import { Vector3 } from "three";

import { TrackData } from "types/TrackData";

// const hData : Array<number> = [];

const detectO = (
    geom : FaceGeometry,
    detections : Array<string>
) : void => {

    const vLeftInner = new Vector3().fromArray(
/* @ts-ignore says it doesn't have annotations but it does */
        geom.face.annotations.lipsLowerInner[0]
    );
    const vRightInner = new Vector3().fromArray(
/* @ts-ignore says it doesn't have annotations but it does */
        geom.face.annotations.lipsLowerInner[10]
    );

    const track : TrackData = geom.track(13, 78, 308);
    const hLength : number = vLeftInner.distanceToSquared(vRightInner); 
    const scale : number = track.scale;
    const softScale : number = Math.round(scale * 100)/100;
    const diff : number = Math.round(hLength - softScale);

    // get the mean for debug
    // if(hData.length < 100) {
    //     hData.push(diff);
    // } else {
    //     hData.splice(0, 1);
    //     hData.push(diff);
    // }

    // const mean = Math.round(hData.reduce((acc, val) => acc + (val/hData.length), 0));
    // console.log('diff:', diff)

    if(diff < 2000) {

        detections.push('O');

    } else {

        detections.splice(0, detections.length);
    }
};

export default detectO;
