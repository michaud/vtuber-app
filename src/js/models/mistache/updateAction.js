const updateAction = (
    _,
    mesh
) => {

    const scale = 7;

    const update = (
        geom
        // moment
    ) => {

        if(mesh.length === 0) return;

        const points = geom.getAttribute('position');
        const track = geom.track(164, 267, 37);

        mesh[0].scale.setScalar(scale * track.scale);
        mesh[0].position.set(
            points.array[0 * 3],
            points.array[(0 * 3) + 1],
            points.array[(0 * 3) + 2]
        );

        mesh[0].rotation.setFromRotationMatrix(track.rotation);
    }

    return update;
};

export default updateAction;
