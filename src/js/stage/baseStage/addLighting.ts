import {
    AmbientLight,
    Group,
    HemisphereLight,
    Light,
    Scene,
    SpotLight,
    Vector3
} from "three";

const addLighting = (group : Group, scene : Scene, lights : Array<Light>) => {


    const fillLightPos = new Vector3(500, -400, 0);
    const fillLight = new SpotLight( 0xffddcc, 300);
    fillLight.position.copy(fillLightPos);
    fillLight.name = 'fillLight';
    group.add( fillLight );
    lights.push( fillLight );

    const highLightPos = new Vector3(-400, 400, 200);
    const highLight = new SpotLight( 0xffffff, 1400);
    highLight.name = 'highLight';
    highLight.position.copy(highLightPos);
    group.add( highLight );
    lights.push( highLight );

    const topLightPos = new Vector3(-60, -60, 460);
    const topLight = new SpotLight( 0xccccff, 0, 10);
    topLight.name = 'topLight';
    
    topLight.position.copy(topLightPos);
    group.add( topLight );
    lights.push( topLight );

    const hemiLight: HemisphereLight = new HemisphereLight(0xffffff, 0x080808, .75);
    hemiLight.name = 'hemiLight';

    group.add( hemiLight );
    lights.push( hemiLight );

    const ambientLight2 : AmbientLight = new AmbientLight(0xffffff, 0.25);
    ambientLight2.name = 'ambientLight2';

    group.add( ambientLight2 );
    lights.push( ambientLight2 );

    scene.add( group );

    return [
        hemiLight,
        ambientLight2,
        topLight,
        highLight,
        fillLight
    ]
}

export default addLighting;
