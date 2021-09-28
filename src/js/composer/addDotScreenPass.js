import { Vector2 } from 'three';
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass.js';

const addDotScreenPass = ({
    composer,
    gui
}) => {

    const params = {
        dotScreen: false,
        centerX: 0,
        centerY: 0,
        angle: 1.28,
        scale: 1.5
    };

    const effectDotScreenPass = new DotScreenPass(new Vector2(0, 0), params.angle, params.scale);

    effectDotScreenPass.enabled = params.dotScreen;

    gui.add(params, 'dotScreen').onChange(function (value) {
        effectDotScreenPass.enabled = Boolean(value);
    });

    const folder = gui.addFolder('dot params');

    folder.add(params, 'centerX', 0.0, 1.0).step(0.01).onChange(function (value) {

        const center = effectDotScreenPass.uniforms['center'].value;

        effectDotScreenPass.uniforms['center'].value.copy(new Vector2(Number(value), center.x));
    });

    folder.add(params, 'centerY', 0.0, 1.0).step(0.01).onChange(function (value) {

        const center = effectDotScreenPass.uniforms['center'].value;

        effectDotScreenPass.uniforms['center'].value.copy(new Vector2(center.x, Number(value)));
    });

    folder.add(params, 'angle', 0.0, 2.0).onChange(function (value) {

        effectDotScreenPass.uniforms['angle'].value = Number(value);
    });

    folder.add(params, 'scale', 0.0, 2.0).onChange(function (value) {

        effectDotScreenPass.uniforms['scale'].value = Number(value);
    });

    composer.addPass(effectDotScreenPass);
};

export default addDotScreenPass;
