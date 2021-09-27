import * as tf from '@tensorflow/tfjs-core';
// Adds the WebGL backend to the global backend registry.
import '@tensorflow/tfjs-backend-webgl';

import render from './render';
import { getPredictions } from './predictions';
import init from './init';


const start = async ()=> {
    
    const av = document.querySelector('gum-av');
    const status = document.querySelector('#status');

    await Promise.all([tf.setBackend('webgl'), av.ready()]);

    render(() => {status.textContent = ""})({
        ...init(av),
        ...await getPredictions(status)
    });
};

start();
