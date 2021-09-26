const updateBowlerAction = (
    _,
    mesh
) => {

    const scale = 9;

    const bolwerUpdate = (
        geom
        // moment
    ) => {

        if(mesh.length === 0) return;

        const points = geom.getAttribute('position');
        const track = geom.track(10, 108, 337);

        mesh[0].scale.setScalar(scale * track.scale);
        mesh[0].position.set(
            points.array[197 * 3],
            points.array[(197 * 3) + 1]-30,
            points.array[(197 * 3) + 2]
        );

        mesh[0].rotation.setFromRotationMatrix(track.rotation);
    }

    return bolwerUpdate;
};

export default updateBowlerAction;
