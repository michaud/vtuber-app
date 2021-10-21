import {
    AmbientLight,
    DirectionalLight,
    HemisphereLight,
    IcosahedronGeometry,
    Light,
    Matrix4,
    Mesh,
    MeshStandardMaterial,
    Scene,
    SpotLight,
    Vector3
} from "three";

const addLighting = (scene : Scene) : Array<Light> => {

    const fillLightPos = new Vector3(400, -140, 0);
    const fillLight = new SpotLight( 0xffddcc, 0, 10);
    fillLight.position.copy(fillLightPos);
    fillLight.name = 'fillLight';
    scene.add( fillLight );

    const highLightPos = new Vector3(-400, 100, 200);
    const highLight = new SpotLight( 0xccccff, .2, 150);
    highLight.power = 1;
    highLight.name = 'highLight';
    highLight.position.copy(highLightPos);
    scene.add( highLight );

    const topLightPos = new Vector3(-60, -60, 460);
    const topLight = new SpotLight( 0xccccff, 0, 10);
    topLight.name = 'topLight';

    topLight.position.copy(topLightPos);
    scene.add( topLight );

    const hemiLight: HemisphereLight = new HemisphereLight(0xffffff, 0x080808, 0);
    hemiLight.name = 'hemiLight';

    scene.add(hemiLight);

    const ambientLight2 : AmbientLight = new AmbientLight(0xffffff, 0);
    ambientLight2.name = 'ambientLight2';

    scene.add(ambientLight2);

    return [
        hemiLight,
        ambientLight2,
        topLight,
        highLight,
        fillLight
    ]
}

export default addLighting;
