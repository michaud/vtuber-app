export const onClear = status => () => {
    status.value = "loaded";
    status.hidden = true;
};

export const onLoadModel = status => () => {
    status.value = "Loading model...";
};

export const onFirstFaceDetection = status => () => {
    status.value = "Detecting face...";
};
