import addOriginHelper from "../helpers/addOriginHelper";

const onClickOrigin = group => () => {

    group.visible = !group.visible;
};

const addDebugTools = (scene)=> {
    
    const btnOrigin = document.querySelector("#btn_origin");
    const group = addOriginHelper(scene);

    group.visible = false;

    btnOrigin.onclick = onClickOrigin(group);
}

export default addDebugTools;
