import { Light, OrthographicCamera, Scene } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Pane } from "tweakpane";
import { Model } from "types/model";
import { EffectPass } from "../composer/addComposer";
import addCameraViewControls from "./addCameraViewControls";
import addComposerInteractions from "./addComposerInteractions";
import addDebugTools from "./addDebugTools";
import addModelInteractions from "./addModelInteractions";

const addUI = (
    pane: Pane,
    models: Array<Model>,
    passes: Array<EffectPass>,
    stages: Array<Model>,
    camera: OrthographicCamera,
    scene: Scene,
    controls: OrbitControls,
    lights: Array<Light>
) => {

    addModelInteractions(models, pane, 'models');
    pane.addSeparator();
    addComposerInteractions(passes, pane);
    pane.addSeparator();

    addModelInteractions(stages, pane, 'stages');

    addCameraViewControls(camera);
    addDebugTools(scene, controls, lights);
}

export default addUI;
