import {
    AnimationMixer,
    Clock,
    OrthographicCamera,
    Scene,
    WebGLRenderer
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { GumAudioVideo } from "../../../third_party/gum-av";
import { FaceMeshFaceGeometry } from "../face/face";
import { Model } from "./model";

export interface AppResources {
    models:Array<Model>,
    faceGeometry:FaceMeshFaceGeometry,
    controls:OrbitControls,
    scene:Scene,
    mixer:AnimationMixer,
    threeTime:Clock,
    renderer:WebGLRenderer,
    composer:EffectComposer,
    camera:OrthographicCamera,
    av:GumAudioVideo
};
