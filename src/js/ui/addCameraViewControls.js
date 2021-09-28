const orientationValues = {
    'top': { x: 0, y: 1, z: 0 },
    'left': { x: -1, y: 0, z: 0 },
    'bottom': { x: 0, y: -1, z: 0 },
    'right': { x: 1, y: 0, z: 0 },
    'front': { x: 0, y: 0, z: 1 },
    'back': { x: 0, y: 0, z: -1 }
}

const onClickView = camera => dir => () => {

    const ori = orientationValues[dir];
    camera.position.set(ori.x, ori.y, ori.z);
};

const addCameraViewControls = (camera, gui) => {

    const btnTop = document.querySelector("#btn_top");
    const btnLeft = document.querySelector("#btn_left");
    const btnRight = document.querySelector("#btn_right");
    const btnBottom = document.querySelector("#btn_bottom");
    const btnFront = document.querySelector("#btn_front");
    const btnBack = document.querySelector("#btn_back");

    const onClickViewCamera = onClickView(camera);

    btnTop.onclick = onClickViewCamera('top');
    btnLeft.onclick = onClickViewCamera('left');
    btnBottom.onclick = onClickViewCamera('bottom');
    btnRight.onclick = onClickViewCamera('right');
    btnFront.onclick = onClickViewCamera('front');
    btnBack.onclick = onClickViewCamera('back');
}

export default addCameraViewControls;
