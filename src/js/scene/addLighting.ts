import {
    AmbientLight,
    DirectionalLight,
    HemisphereLight,
    IcosahedronGeometry,
    Mesh,
    MeshStandardMaterial,
    Scene,
    SpotLight,
    Vector3
} from "three";

const addLighting = (scene : Scene) : void => {

    const posScalar = 400;

    const fillLightPos = new Vector3(1, -.35, 0);
    const fillLight = new DirectionalLight( 0xffddcc, 3);
    fillLightPos.setLength(posScalar);
    fillLight.position = fillLightPos;
    scene.add( fillLight );

    /* keep for debugging */
    // const fillLightPositionMesh = new Mesh(new IcosahedronGeometry(5, 4));
    // fillLightPositionMesh.position.set(fillLightPos.x, fillLightPos.y, fillLightPos.z);
    // scene.add(fillLightPositionMesh);

    const highLightPos = new Vector3(-1, .25, 0.5);
    const highLight = new DirectionalLight( 0xccccff, 3 );
    highLightPos.setLength(posScalar);
    highLight.position = highLightPos;
    scene.add( highLight );

    /* keep for debugging */
    // const highLightPositionMesh = new Mesh(new IcosahedronGeometry(5, 4));
    // highLightPositionMesh.position.set(highLightPos.x, highLightPos.y, highLightPos.z);
    // scene.add(highLightPositionMesh);

    const topLightPos = new Vector3(-.15, -.15, 1.15);
    const topLight = new DirectionalLight( 0xccccff, 10 );
    topLightPos.setLength(posScalar);
    topLight.position = topLightPos;
    scene.add( topLight );

    /* keep for debugging */
    // const topLightPositionMesh = new Mesh(new IcosahedronGeometry(5, 4));
    // topLightPositionMesh.position.set(topLightPos.x, topLightPos.y, topLightPos.z);
    // scene.add(topLightPositionMesh);

    const hemiLight: HemisphereLight = new HemisphereLight(0xffffff, 0x080808, .75);
    scene.add(hemiLight);

    const ambientLight2 : AmbientLight = new AmbientLight(0xffffff, 1.15);
    scene.add(ambientLight2);
}

export default addLighting;
