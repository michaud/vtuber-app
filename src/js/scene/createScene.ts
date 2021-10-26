import {
    WebGLRenderer,
    Scene,
    OrthographicCamera
} from 'three';

import { SceneResources } from 'types/SceneResources';
import addDebugPlane from './addDebugPlane';
import addLighting from './addLighting';
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
    const camera: OrthographicCamera = new OrthographicCamera(1, 1, 1, 1, -1000, 1000);
    //addHDR(scene, renderer);

    const lights = addLighting(scene);

    //addDebugPlane(scene);

    return {
        renderer,
        scene,
        camera,
        canvas,
        lights
    }
};

export default createSene;
