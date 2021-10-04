import * as tf from '@tensorflow/tfjs-core';
/* Adds the WebGL backend to the global backend registry. */
import '@tensorflow/tfjs-backend-webgl';

import render from './render/render.js';
import getFaceDetection from './faceDetection/getFaceDetection.js';
import init from './init.js';
import {
    onClear,
    onFirstFaceDetection,
    onLoadModel
} from './ui/statusUpdates.js';
import getPane from './ui/getPane.js';

const start = async ()=> {
    
    const av = document.querySelector('gum-av');
    await Promise.all([tf.setBackend('webgl'), av.ready()]);
    
    const { pane, status } = getPane();

    const data = init(av, pane);

    const faceDetection = await getFaceDetection(onLoadModel(status))

    const renderLoop = render(
        onClear(status),
        onFirstFaceDetection(status),
        {
            ...data,
            ...faceDetection
        }
    );
    
    renderLoop();
};

start();
