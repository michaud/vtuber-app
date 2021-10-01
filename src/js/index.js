import * as tf from '@tensorflow/tfjs-core';
/* Adds the WebGL backend to the global backend registry. */
import '@tensorflow/tfjs-backend-webgl';

import {
    Pane
} from 'tweakpane';
import * as EssentialsPlugin from '@tweakpane/plugin-essentials';

import render from './render/render.js';
import { getFaceDetection } from './faceDetection/getFaceDetection.js';
import init from './init.js';
import {
    onClear,
    onFirstFaceDetection,
    onLoadModel
} from './ui/statusUpdates.js';

const start = async ()=> {
    
    const av = document.querySelector('gum-av');

    const pane = new Pane();
    pane.containerElem_.style.width = '250px';
    pane.containerElem_.style.left = 0;
    pane.registerPlugin(EssentialsPlugin);

    const status = pane.addBlade({
        view: 'text',
        label: 'status',
        parse: (v) => String(v),
        value: 'loading...',
    });
    
    await Promise.all([tf.setBackend('webgl'), av.ready()]);

    const data = init(av, pane);
    const faceDetection = await getFaceDetection(onLoadModel(status))

    render(
        onClear(status),
        onFirstFaceDetection(status),
        {
            ...data,
            ...faceDetection
        }
    )();
};

start();
