import {
    WebGLRenderer,
    Scene,
    OrthographicCamera,
    PerspectiveCamera,
    Camera
} from 'three';

import { SceneResources } from 'types/SceneResources';
/* import addHDR from './addHDR'; */
import addRendererSettings from './addRendererSettings';

const createSene = (canvas : HTMLCanvasElement): SceneResources => {

    /* Set a background color, or change alpha to false for a solid canvas. */
    const renderer: WebGLRenderer = new WebGLRenderer({
        antialias: true,
        alpha: true,
        canvas
    });

    addRendererSettings(renderer);

    const scene: Scene = new Scene();
    const camera: Camera = new OrthographicCamera(
        1, 1, 1, 1,
        -10000, 10000
    );
    // const camera: Camera = new PerspectiveCamera(
    //     50,
    //     1,
    //     0.1,
    //     10000
    // );
    camera.position.z = 4000;
    //addHDR(scene, renderer);

    return {
        renderer,
        scene,
        camera,
        canvas
    }
};

export default createSene;
