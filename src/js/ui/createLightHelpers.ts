import { Light, Object3D, Scene, SpotLightHelper } from "three";
import { Model } from "types/model";

export const createLightHelpers = (
    scene: Scene,
    stages: Model[],
    helpers: Array<Object3D>
) : Array<Light> => {

    const lights: Array<Light> = stages.reduce(
        (acc: Array<Light>, model: Model) => acc.concat(model.lights ?? []),
        []
    );

    lights.forEach(light => {

        if ((light.type === 'PointLight' || light.type === 'SpotLight') &&
            scene.children.findIndex(item => item.name === `${light.name}_position`) < 0) {

            if (light.type === 'PointLight' || light.type === 'SpotLight') {

                const spotLightHelper = new SpotLightHelper(light);
                spotLightHelper.name = `${light.name}_position`;
                scene.add(spotLightHelper);
                spotLightHelper.scale.setScalar(.1);


                spotLightHelper.visible = false;
                helpers.push(spotLightHelper);
                scene.add(spotLightHelper);
            }
        }
    });

    return lights;
};
