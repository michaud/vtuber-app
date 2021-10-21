import FaceGeometry from "face/FaceGeometry";
import { GumAudioVideo } from "thirdparty/gum-av";
import {
    AnimationMixer,
    Clock,
    OrthographicCamera,
    Scene,
    WebGLRenderer
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { Model } from "./model";

export interface AppResources {
    models:Array<Model>,
    stages:Array<Model>,
    faceGeometry:FaceGeometry,
    controls:OrbitControls,
    scene:Scene,
    mixer:AnimationMixer,
    threeTime:Clock,
    renderer:WebGLRenderer,
    composer:EffectComposer,
    camera:OrthographicCamera,
    av:GumAudioVideo
};
