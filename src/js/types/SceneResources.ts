import {
    OrthographicCamera,
    Scene,
    WebGLRenderer
} from "three";

export interface SceneResources {
    renderer : WebGLRenderer,
    scene : Scene,
    camera : OrthographicCamera,
    canvas : HTMLCanvasElement    
}
