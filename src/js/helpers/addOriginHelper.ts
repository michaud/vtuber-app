import {
    ArrowHelper,
    Group,
    Scene,
    Vector3
} from "three";

const addOriginHelper = (scene:Scene) => {

    const dirx = new Vector3(1, 0, 0);
    const diry = new Vector3(0, 1, 0);
    const dirz = new Vector3(0, 0, 1);

    /* normalize the direction vector (convert to vector of length 1) */
    dirx.normalize();
    diry.normalize();
    dirz.normalize();

    const origin = new Vector3(0, 0, 0);
    const length = 10;

    const arrowHelperx = new ArrowHelper(dirx, origin, length, 0xff0000);
    const arrowHelpery = new ArrowHelper(diry, origin, length, 0x00ff00);
    const arrowHelperz = new ArrowHelper(dirz, origin, length, 0x0000ff);

    const group = new Group();
    group.name = 'origin';

    group.add(arrowHelperx);
    group.add(arrowHelpery);
    group.add(arrowHelperz);

    scene.add(group);

    return group;
};

export default addOriginHelper;
    