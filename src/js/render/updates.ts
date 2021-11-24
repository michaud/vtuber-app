import { Model } from "types/model";
import { BufferAttribute } from "three";
import FaceGeometry from "face/FaceGeometry";

const updates = (
    models : Array<Model>,
    stages: Array<Model>,
    geom : FaceGeometry,
    timeStamp : number
) => {

    const points : BufferAttribute = <BufferAttribute>geom.getAttribute('position');
    const normals :  BufferAttribute = <BufferAttribute>geom.getAttribute('normal');

    models.forEach((model : Model) => {

        if(!model.active) return

        model.update({
            geom,
            moment: timeStamp,
            points,
            normals,
            faceTrackindeces: model.faceTrackindeces
        });

        model.detectors?.forEach(detector => {
            detector.detectAction(geom, detector.detection(geom))
        })
    });

    stages.forEach((stage : Model) => stage.active && stage.update({
        geom,
        moment: timeStamp,
        points,
        normals,
        lights: stage.lights
    }));
};

export default updates;
