import * as tf from '@tensorflow/tfjs-core';
/* Adds the WebGL backend to the global backend registry. */
import '@tensorflow/tfjs-backend-webgl';
import {
    MediaPipeFaceMesh
} from '@tensorflow-models/face-landmarks-detection/dist/mediapipe-facemesh';
import render from './render/render';
import getFaceDetection from './faceDetection/getFaceDetection';
import init from './init';
import {
    onClear,
    onFirstFaceDetection,
    onLoadModel
} from './ui/statusUpdates';
import getPane, { Panels } from './ui/getPane';
import { AppResources } from './types/AppResources';
import { GumAudioVideo } from '../../third_party/gum-av';


const start = async () : Promise<void> => {
    
    const av : GumAudioVideo = document.querySelector('gum-av');

    await Promise.all([tf.setBackend('webgl'), av.ready()]);
    
    const { pane, status }:Panels = getPane();

    const data : AppResources = init(av, pane);

    const faceDetectionModel : MediaPipeFaceMesh = await getFaceDetection(
        onLoadModel(status)
    );

    const renderLoop = render(
        onClear(status),
        onFirstFaceDetection(status),
        {
            ...data,
            faceDetectionModel
        }
    );
    
    renderLoop();
};

start();
