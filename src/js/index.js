import * as tf from '@tensorflow/tfjs-core';
// Adds the WebGL backend to the global backend registry.
import '@tensorflow/tfjs-backend-webgl';

import render from './render/render.js';
import { getFaceDetection } from './getFaceDetection.js';
import init from './init.js';
import {
    onClear,
    onFirstFaceDetection,
    onLoadModel
} from './ui/statusUpdates.js';

const start = async ()=> {
    
    const av = document.querySelector('gum-av');
    const status = document.querySelector('#status');

    await Promise.all([tf.setBackend('webgl'), av.ready()]);

    render(
        onClear(status),
        onFirstFaceDetection(status)
    )({
        ...init(av),
        ...await getFaceDetection(
            onLoadModel(status)
        )
    });
};

start();
