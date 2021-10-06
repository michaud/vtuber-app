import {
    PlaneGeometry,
    CircleGeometry,
} from 'three';

const switchToCirclesAction = (
    updateList,
    mesh
) => {

    const name = 'toggleShowUpdate';

    const switchToCirclesUpdate = (
        // geom,
        // moment
    ) => {

        if (mesh.length > 0) mesh.map(plane => {

            plane.children[0].geometry.type === 'PlaneGeometry' ?
                plane.children[0].geometry = new CircleGeometry(.66, 36)
                :
                plane.children[0].geometry = new PlaneGeometry(1, 1);
        });

        /* remove yourself from the updateList */
        const idx = updateList.findIndex(item => item.name === name);
        updateList.splice(idx, 1);
    };

    return switchToCirclesUpdate;
};

export default switchToCirclesAction;
