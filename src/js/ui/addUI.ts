import { EffectPass } from "types/PostProcessing";
import { Model } from "types/model";
import { Camera, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Pane } from "tweakpane";
import addCameraViewControls from "./addCameraViewControls";
import addComposerInteractions from "./addComposerInteractions";
import addDebugTools from "./addDebugTools";
import addModelInteractions from "./addModelInteractions";

const addUI = (
    pane: Pane,
    models: Array<Model>,
    passes: Array<EffectPass>,
    stages: Array<Model>,
    camera: Camera,
    scene: Scene,
    controls: OrbitControls,
    renderer: WebGLRenderer
) => {

    addModelInteractions(models, scene, pane, 'models');
    pane.addSeparator();

    addComposerInteractions(passes, renderer, pane);
    pane.addSeparator();

    addModelInteractions(stages, scene, pane, 'stages');

    addCameraViewControls(camera);

    addDebugTools(scene, camera, controls, stages);
}

export default addUI;
