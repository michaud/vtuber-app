
import FaceMeshFaceGeometry from "../../face/FaceMeshFaceGeometry";
import { AnimationAction } from "three";
import { Detector } from "types/Detector";

const blowDetectAction = (
    animations : Array<AnimationAction>
) => {
    const detecting : Detector = (
        _geom: FaceMeshFaceGeometry,
        detections : Array<string>
    ) => {

        if (animations.length > 0 && detections?.includes?.('O')) {

            const anim = animations[Math.floor(Math.random() * animations.length)];

            if (!anim.isRunning()) {
                anim.reset();
                anim.clampWhenFinished = false;
                anim.play();
            }
        }
    };

    return detecting;
};

export default blowDetectAction;
