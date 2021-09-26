import resize from "./resize.js";

const setUpResize = (
    av,
    camera,
    faceGeometry,
    renderer
) => {

    const resizeUpdate = resize(
        av,
        camera,
        faceGeometry,
        renderer
    );
    window.addEventListener("resize", () => resizeUpdate());
    resizeUpdate();
};

export default setUpResize;
