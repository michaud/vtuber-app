import FaceGeometry from "face/FaceGeometry";
import { AnimationAction } from "three";
import { DetectUpdate } from "types/Detector";

const blowDetectAction = (
    animations : Array<AnimationAction>
) : DetectUpdate => {

    const detectActionUpdate : DetectUpdate = (
        _geom: FaceGeometry,
        detection : string
    ) => {

        if (animations.length > 0 && detection === 'O') {

            const anim = animations[Math.floor(Math.random() * animations.length)];

            if (!anim.isRunning()) {
                anim.reset();
                anim.clampWhenFinished = false;
                anim.play();
            }
        }
    };

    return detectActionUpdate;
};

export default blowDetectAction;
