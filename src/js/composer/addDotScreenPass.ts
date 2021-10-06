import { Vector2 } from 'three';
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass.js';
import { PassArguments } from '../types/PassArguments';

const addDotScreenPass = ({
    composer,
    folder
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

    const f = folder.addFolder({
        title: 'dot screen',
        expanded: true,
    });

    f.addInput(params, 'dotscreen', { label: 'on'}).on('change',(ev)=> {
        pass.enabled = Boolean(ev.value);
    });

    const fparams = f.addFolder({
        title: 'params',
        expanded: false,
    });

    fparams.addInput(params, 'centerX', {
        label: 'centerX',
        step: 0.1,
        min: 0.0,
        max: 1.0,
    }).on('change', (ev)=> {
/* @ts-ignore  */
        pass.uniforms['center'].value.copy(
            new Vector2(
                Number(ev.value),
/* @ts-ignore  */
                pass.uniforms['center'].value.y
            )
        );
    })

    fparams.addInput(params, 'centerY', {
        label: 'centerY',
        step: 0.1,
        min: 0.0,
        max: 1.0,
    }).on('change', (ev)=> {
/* @ts-ignore  */
        pass.uniforms['center'].value.copy(
            new Vector2(
/* @ts-ignore  */
                pass.uniforms['center'].value.x,
                Number(ev.value)
            )
        );
    });

    fparams.addInput(params, 'angle', {
        label: 'angle',
        step: 0.1,
        min: 0.0,
        max: Math.PI * 2,
    }).on(
        'change',
/* @ts-ignore  */
        (ev)=> pass.uniforms['angle'].value = Number(ev.value)
    );

    fparams.addInput(params, 'scale', {
        label: 'scale',
        step: 0.1,
        min: 0.0,
        max: Math.PI * 2,
    }).on(
        'change',
/* @ts-ignore  */
        (ev)=> pass.uniforms['scale'].value = Number(ev.value)
    );

    folder.addSeparator();

    composer.addPass(pass);

    return pass;
};

export default addDotScreenPass;
