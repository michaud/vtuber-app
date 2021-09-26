import { VertexNormalsHelper } from "three/examples/jsm/helpers/VertexNormalsHelper";

const addNormalHelper = (scene, _mesh) => {

    const previous = scene.getObjectByName(`velper${_mesh.uuid}`);
    if(previous) scene.remove(previous);

    const helper = new VertexNormalsHelper(_mesh, 10, 0x00ff00);
    helper.name = `velper${_mesh.uuid}`;
    scene.add(helper);
};

export default addNormalHelper;
