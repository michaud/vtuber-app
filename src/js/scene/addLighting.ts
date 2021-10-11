import { AmbientLight, DirectionalLight, HemisphereLight, IcosahedronGeometry, Mesh, MeshStandardMaterial, Scene, SpotLight, Vector3 } from "three";

const addLighting = (scene : Scene) : void => {

    const posScalar = 400;

    const fillLightPos = new Vector3(1, -.35, 0);
    const fillLight = new DirectionalLight( 0xffddcc, 3);
    fillLightPos.setLength(posScalar);
    fillLight.position = fillLightPos;
    scene.add( fillLight );

    const fillLightPositionMesh = new Mesh(new IcosahedronGeometry(5, 4));
    fillLightPositionMesh.position.set(fillLightPos.x, fillLightPos.y, fillLightPos.z);
    scene.add(fillLightPositionMesh);

    const highLightPos = new Vector3(-1, .25, 0.5);
    const highLight = new DirectionalLight( 0xccccff, 3 );
    highLightPos.setLength(posScalar);
    highLight.position = highLightPos;
    scene.add( highLight );

    const highLightPositionMesh = new Mesh(new IcosahedronGeometry(5, 4));
    highLightPositionMesh.position.set(highLightPos.x, highLightPos.y, highLightPos.z);
    scene.add(highLightPositionMesh);

    const topLightPos = new Vector3(-.15, .45, 0.75);
    const topLight = new DirectionalLight( 0xccccff, 8 );
    topLightPos.setLength(posScalar);
    topLight.position = topLightPos;
    scene.add( topLight );

    const topLightPositionMesh = new Mesh(new IcosahedronGeometry(5, 4));
    topLightPositionMesh.position.set(topLightPos.x, topLightPos.y, topLightPos.z);
    scene.add(topLightPositionMesh);

    // /* Add lights */
    // const spotLight: SpotLight = new SpotLight(0xffffff, 1);
    // spotLight.position.set(-200, 400, 400);

    // // Create a red material for the nose.
    // const spotLightPositionMaterial = new MeshStandardMaterial({
    //     color: 0xff0000,
    //     roughness: 0.4,
    //     metalness: 0.1,
    //     transparent: true,
    // });

    // const spotLightPositionMesh = new Mesh(new IcosahedronGeometry(5, 3), spotLightPositionMaterial);
    // spotLightPositionMesh.position.set(0, 0, 100);
    // scene.add(spotLightPositionMesh);


    // scene.add(spotLight);

    // spotLight.castShadow = true;

    // spotLight.shadow.mapSize.width = 1024;
    // spotLight.shadow.mapSize.height = 1024;

    // spotLight.shadow.camera.near = 200;
    // spotLight.shadow.camera.far = 800;

    // spotLight.shadow.camera.fov = 40;

    // spotLight.shadow.bias = -0.001125;

    // scene.add(spotLight);

    const hemiLight: HemisphereLight = new HemisphereLight(0xffffff, 0x080808, .5);
    scene.add(hemiLight);

    // const ambientLight : AmbientLight = new AmbientLight(0x001a24, .51);
    // scene.add(ambientLight);
    const ambientLight2 : AmbientLight = new AmbientLight(0xffffff, .85);
    scene.add(ambientLight2);
}

export default addLighting;
