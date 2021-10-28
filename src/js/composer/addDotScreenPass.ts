import { Vector2 } from 'three';
import { PassArguments } from 'types/PostProcessing';
import { DotScreenPass } from './DotScreenPass';

const addDotScreenPass = ({
    composer
} : PassArguments) => {

    const params = {
        'dotscreen': false,
        centerX: 0,
        centerY: 0,
        angle: 1.28,
        scale: 1.5
    };

    const pass : DotScreenPass = new DotScreenPass(new Vector2(0, 0), params.angle, params.scale);

    pass.enabled = params['dotscreen'];

    composer.addPass(pass);

    return {
        name: 'dotScreenPass',
        params,
        passes: {
            pass
        }
    };
};

export default addDotScreenPass;
