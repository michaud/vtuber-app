import {
    ArrowHelper,
    Group,
    Object3D,
    Vector3
} from "three";

const getPositionHelper = (item: Object3D, postfix: string) : Group => {

    const dirx = new Vector3(1, 0, 0);
    const diry = new Vector3(0, 1, 0);
    const dirz = new Vector3(0, 0, 1);

    /* normalize the direction vector (convert to vector of length 1) */
    dirx.normalize();
    diry.normalize();
    dirz.normalize();
    const origin = new Vector3(0, 0, 0);
    const length = 10;

    origin.copy(item.position);

    const arrowHelperx = new ArrowHelper(dirx, origin, length, 0xff0000);
    const arrowHelpery = new ArrowHelper(diry, origin, length, 0x00ff00);
    const arrowHelperz = new ArrowHelper(dirz, origin, length, 0x0000ff);

    const group = new Group();
    group.name = `${item.name}${postfix}`;

    group.add(arrowHelperx);
    group.add(arrowHelpery);
    group.add(arrowHelperz);

    return group;
};

export default getPositionHelper;
    