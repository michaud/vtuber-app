import { DetectUpdate } from "types/Detector";
import { Model } from "types/model";
import { BufferAttribute } from "three";
import FaceGeometry from "face/FaceGeometry";
import detect from "../detect/detect";
import detectors from "../detect/detectors";

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

            if(model.actions?.detectUpdate) {

                const detections : Array<string> = detect(
                    detectors,
                    geom
                );

                if(detections.length > 0) {

                    (model.actions.detectUpdate as DetectUpdate)(geom, detections);
                } 
            }
        }
    );

    stages.forEach((stage : Model) => stage.update(
        geom,
        timeStamp,
        points,
        normals
    ));
};

export default updates;
