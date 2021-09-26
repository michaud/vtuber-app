import { Vector3 } from "three";

const hData = [];

const detectO = (geom, detections) => {

    const vLeftInner = new Vector3().fromArray(geom.face.annotations.lipsLowerInner[0]);
    const vRightInner = new Vector3().fromArray(geom.face.annotations.lipsLowerInner[10]);

    const track = geom.track(13, 78, 308);
    const hLength = vLeftInner.distanceToSquared(vRightInner); 
    const scale = track.scale;
    const softScale = Math.round(scale * 100)/100;
    const calcL = Math.round(softScale * softScale * 1475);
    const diff = Math.round(hLength - calcL);

    // get the mean for debug
    // if(hData.length < 100) {
    //     hData.push(diff);
    // } else {
    //     hData.splice(0, 1);
    //     hData.push(diff);
    // }

    // const mean = hData.reduce((acc, val) => acc + (val/hData.length), 0);
    // //console.log('mean:', mean)

    if(diff < -200) {

        detections.push('O');
    } else {
        detections.splice(0, detections.length);
    }
};

export default detectO;
