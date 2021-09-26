const updateNoseAction = (
    _,
    mesh
) => {

    const scale = 15;

    const noseUpdate = (
        geom,
        // moment
    ) => {

        if(mesh.length === 0) return;

        // Modify nose position and orientation.
        const track = geom.track(5, 45, 275);
        mesh[0].position.copy(track.position);
        mesh[0].rotation.setFromRotationMatrix(track.rotation);
        mesh[0].scale.setScalar(scale * track.scale);
    }

    return noseUpdate;
};

export default updateNoseAction;
