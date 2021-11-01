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

            model.update(
                geom,
                timeStamp,
                points,
                normals
            );

            model.detectors?.forEach(detector => {
                detector.detectAction(geom, detector.detection(geom))
            })
        }
    );

    stages.forEach((stage : Model) => stage.update(
        geom,
        timeStamp,
        points,
        normals,
        stage.lights
    ));
};

export default updates;
