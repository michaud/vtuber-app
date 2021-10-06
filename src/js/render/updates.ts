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

    const points : BufferAttribute = geom.getAttribute('position') as BufferAttribute;
    const normals :  BufferAttribute = geom.getAttribute('normal') as  BufferAttribute;

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
