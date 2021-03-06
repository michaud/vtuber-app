import {
    PlaneGeometry,
    CircleGeometry,
    Object3D,
    Mesh,
} from 'three';
import { Action, ActionModelResources } from 'types/Action';
import { Update } from 'types/Update';

const switchToCirclesAction : Action = (
    updateList,
    { mesh }
) : Update => {

    const name = 'toggleShowUpdate';

    const switchToCirclesUpdate : Update = () => {

        if (mesh.length > 0) mesh.forEach(plane => {

            const item : Mesh = <Mesh>plane.children[0];
            item.geometry.type === 'PlaneGeometry' ?
                item.geometry = new CircleGeometry(.66, 36)
                :
                item.geometry = new PlaneGeometry(1, 1);
        });

        /* remove yourself from the updateList */
        const idx = updateList.findIndex(item => item.name === name);
        updateList.splice(idx, 1);
    };

    return switchToCirclesUpdate;
};

export default switchToCirclesAction;
