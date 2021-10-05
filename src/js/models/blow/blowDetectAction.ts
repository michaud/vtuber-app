import { AnimationAction } from "three";

const blowDetectAction = (animations : AnimationAction[]) => (detections : string[]) => {

    if (animations.length > 0 && detections && detections.includes('O')) {

        const anim = animations[Math.floor(Math.random() * animations.length)];

        if (!anim.isRunning()) {
            anim.reset();
            anim.clampWhenFinished = false;
            anim.play();
        }
    }
};

export default blowDetectAction;
