import * as tf from '@tensorflow/tfjs-core';
// Adds the WebGL backend to the global backend registry.
import '@tensorflow/tfjs-backend-webgl';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';

const av = document.querySelector("gum-av");

const render = async (model)=> {
    const faces = await model.estimateFaces({
        input: av.video
    });

    if(faces.length > 0) {

        console.log('faces:', faces)
    }
};

const start = async ()=> {

    await Promise.all([tf.setBackend("webgl"), av.ready()]);

    const model = await faceLandmarksDetection.load(
        faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
    );
    
    render(model);
}

start();
