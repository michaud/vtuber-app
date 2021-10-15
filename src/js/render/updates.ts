import { BufferAttribute } from "three";
import { FaceMeshFaceGeometry } from "../face/face";
import { Detector } from "../types/Detector";
import { Model } from "../types/model";

const updates = (
    models : Array<Model>,
    geom : FaceMeshFaceGeometry,
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
};

export default updates;
