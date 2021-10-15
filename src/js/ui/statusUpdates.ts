export const onClear = (status : any) => () => {
    status.value = "loaded";
    status.hidden = true;
};

export const onLoadModel = (status : any) => () => {
    status.value = "Loading model...";
};

export const onFirstFaceDetection = (status : any) => () => {

    status.value = "Detecting face...";
};
