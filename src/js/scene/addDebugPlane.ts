import {
    DoubleSide,
    Mesh,
    MeshBasicMaterial,
    PlaneGeometry,
    Scene
} from "three";

const addDebugPlane = (scene: Scene) => {

    const geometry = new PlaneGeometry( 1000, 1000 );

    const material = new MeshBasicMaterial({
        color: 0xffffff,
        side: DoubleSide
    });
    const plane = new Mesh( geometry, material );
    plane.position.setY(-200);
    plane.rotation.x = Math.PI / 2;
    scene.add( plane );
}

export default addDebugPlane;
