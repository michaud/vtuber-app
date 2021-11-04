import {
    WebGLRenderer,
    Scene,
    OrthographicCamera,
    PerspectiveCamera,
    Camera
} from 'three';

import { SceneResources } from 'types/SceneResources';
import addRendererSettings from './addRendererSettings';

const createSene = (canvas : HTMLCanvasElement): SceneResources => {

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
    camera.position.z = 4000;

    return {
        renderer,
        scene,
        camera,
        canvas
    }
};

export default createSene;
