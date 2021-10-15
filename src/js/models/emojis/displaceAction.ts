import { Object3D, Vector3 } from "three";
import { Update } from "../../types/Action";
import { circularMapping } from "./circularMapping";
import { verticalMappingPadded } from "./verticalMapping";

const displaceAction = (
    updateList : Array<Update>,
    mesh : Array<Object3D>
) => {

    const name = 'displaceUpdate';

    let startReveal : number;
    const revealduration = 1;
    let revealInterval : number = revealduration / circularMapping.length;
    let revealIndex : number = 0;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const img = new Image();
    img.onload = () => context.drawImage(img, 0, 0);

    img.src = '/assets/center_bulb2.png';

    const displaceUpdate : Update = (
        geom,
        moment
    ) => {

        if (!startReveal) startReveal = moment;

        if (moment > startReveal + (revealIndex * revealInterval)) {

            const points = geom.getAttribute('position');
            const normals = geom.getAttribute('normal');

            for (let y = 0; y < verticalMappingPadded.length; y++) {

                for (let x = 0; x < 40; x++) {

                    const geomIndex = verticalMappingPadded[y][x];

                    if(geomIndex > -1) {

                        const colors = context.getImageData(x, y, 1, 1).data;
    
                        if (colors[0] > 0) {

                            const delta = ((revealIndex * revealInterval) * (colors[0] / 255)) * 20;

                            const point = new Vector3(
                                points.array[geomIndex * 3],
                                points.array[(geomIndex * 3) + 1],
                                points.array[(geomIndex * 3) + 2]
                            );

                            const vnormal = new Vector3(
                                normals.array[geomIndex * 3],
                                normals.array[(geomIndex * 3) + 1],
                                normals.array[(geomIndex * 3) + 2]
                            );
                            vnormal.negate();
                            vnormal.multiplyScalar(delta);
                            point.add(vnormal)

                            geom.attributes.position.needsUpdate = true;
                            mesh[geomIndex].position.set(point.x, point.y, point.z);
                        }
                    }
                }
            }

            if (revealIndex < verticalMappingPadded.length - 1) {

                revealIndex++;

            } else {

                /* reset */
                startReveal = undefined;
                revealIndex = 0;

                /* remove yourself from the updateList */
                const idx = updateList.findIndex(item => item.name === name);
                updateList.splice(idx, 1);
            }
        }
    };

    return displaceUpdate;
};

export default displaceAction;
