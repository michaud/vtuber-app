const updateGlassesAction = (
    _,
    mesh
) => {

    const scale = 8;

    const glassesUpdate = (
        geom
        // moment
    ) => {

        if(mesh.length === 0) return;

        const points = geom.getAttribute('position');
        const track = geom.track(6, 196, 419);

        mesh[0].scale.setScalar(scale * track.scale);
        mesh[0].position.set(
            points.array[197 * 3],
            points.array[(197 * 3) + 1],
            points.array[(197 * 3) + 2]
        );

        mesh[0].rotation.setFromRotationMatrix(track.rotation);
    };

    return glassesUpdate;
};

export default updateGlassesAction;
