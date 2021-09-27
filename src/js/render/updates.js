const updates = (
    actions,
    geom,
    timeStamp,
    detections
) => actions.map(
    action => {

        action.update(
            geom,
            timeStamp
        );
        
        if(detections.length > 0) action.actions.detections && action.actions.detections(detections);
    }
);

export default updates;
