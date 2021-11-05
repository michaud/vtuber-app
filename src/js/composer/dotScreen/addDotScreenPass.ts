import { Vector2 } from 'three';
import { PassArguments } from 'types/PostProcessing';
import { DotScreenPass } from './DotScreenPass';

const addDotScreenPass = ({
    composer
} : PassArguments) => {

    const params = {
        enabled: false,
        centerX: 0,
        centerY: 0,
        angle: 1.28,
        scale: 1.5
    };

    const pass : DotScreenPass = new DotScreenPass(
        new Vector2(params.centerX, params.centerY),
        params.angle,
        params.scale
    );

    pass.enabled = params.enabled;

    const add = () => {
        
        composer.addPass( pass );
    }

    const remove = () => {
        
        composer.removePass( pass );
    }

    return {
        name: 'dotScreenPass',
        params,
        passes: {
            pass
        },
        add,
        remove
    };
};

export default addDotScreenPass;
