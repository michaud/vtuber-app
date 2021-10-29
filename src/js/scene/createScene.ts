import {
    WebGLRenderer,
    Scene,
    OrthographicCamera
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
    const camera: OrthographicCamera = new OrthographicCamera(
        1, 1, 1, 1,
        -2000, 2000
    );
    //addHDR(scene, renderer);

    return {
        renderer,
        scene,
        camera,
        canvas
    }
};

export default createSene;
