const resize = (
    av,
    camera,
    faceGeometry,
    renderer
) => async () => {
    
    await av.ready();
    // Resize orthographic camera to video dimensions if necessary.
    const w = av?.video?.videoWidth ?? 0;
    const h = av?.video?.videoHeight ?? 0;
    camera.left = -0.5 * w;
    camera.right = 0.5 * w;
    camera.top = 0.5 * h;
    camera.bottom = -0.5 * h;
    camera.updateProjectionMatrix();
    faceGeometry.setSize(w, h);

    const videoAspectRatio = w / h;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const windowAspectRatio = windowWidth / windowHeight;
    let adjustedWidth;
    let adjustedHeight;

    if (videoAspectRatio > windowAspectRatio) {

        adjustedWidth = windowWidth;
        adjustedHeight = windowWidth / videoAspectRatio;

    } else {

        adjustedWidth = windowHeight * videoAspectRatio;
        adjustedHeight = windowHeight;
    }

    renderer.setSize(adjustedWidth, adjustedHeight);
}

export default resize;
