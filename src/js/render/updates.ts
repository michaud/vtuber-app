import FaceGeometry from "face/FaceGeometry";
import { BufferAttribute } from "three";

import { Detector } from "types/Detector";
import { Model } from "types/model";

const updates = (
    models : Array<Model>,
    stages: Array<Model>,
    geom : FaceGeometry,
    timeStamp : number,
    detections : Array<string>
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

            if(detections.length > 0) {

                (model.actions?.detections as Detector)?.(geom, detections);
            }
        }
    );

    stages.forEach((stage : Model) => {

            stage.update(
                geom,
                timeStamp,
                points,
                normals
            );
        }
    );
};

export default updates;
