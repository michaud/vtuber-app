import {
    Camera,
    Light,
    OrthographicCamera,
    Scene,
    WebGLRenderer
} from "three";

export interface SceneResources {
    renderer : WebGLRenderer,
    scene : Scene,
    camera : Camera,
    canvas : HTMLCanvasElement
}
