import { FaceMeshFaceGeometry } from "../face/face";
import { Detector } from "../types/Detector";
import { Model } from "../types/model";

const updates = (
    models : Array<Model>,
    geom : FaceMeshFaceGeometry,
    timeStamp : number,
    detections : Array<string>
) => {
    
    models.forEach((model : Model) => {

            model.update(
                geom,
                timeStamp
            );

            if(detections.length > 0) {

                (model.actions?.detections as Detector)?.(geom, detections);
            }
        }
    );
};

export default updates;
