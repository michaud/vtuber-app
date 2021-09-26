const detect = (detectors = [], geom) => {

    const detections = [];
    detectors.map(
        detector => detector(geom, detections)
    );

    return detections;
};

export default detect;
