const updateDuckAction = (
    _,
    mesh
) => {

    const scale = 9;

    const update = (
        geom,
        // moment
    ) => {

        if(mesh.length === 0) return;

        const points = geom.getAttribute('position');
        const track = geom.track(6, 196, 419);
        const adjustedScale = scale * track.scale;

        mesh[0].scale.setScalar(adjustedScale);

        mesh[0].position.set(
            points.array[197 * 3],
            points.array[(197 * 3) + 1],
            points.array[(197 * 3) + 2]
        )

        mesh[0].rotation.setFromRotationMatrix(track.rotation);
    };

    return update;
};

export default updateDuckAction;
