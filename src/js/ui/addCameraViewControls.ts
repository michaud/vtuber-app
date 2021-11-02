import { Camera } from "three";

export type Vect3 = {
    x : number,
    y : number,
    z : number
} 

export type OrientationValues = {
    [index : string]: Vect3
}

const orientationValues : OrientationValues = {
    'top': { x: 0, y: 1, z: 0 },
    'left': { x: -1, y: 0, z: 0 },
    'bottom': { x: 0, y: -1, z: 0 },
    'right': { x: 1, y: 0, z: 0 },
    'front': { x: 0, y: 0, z: 1 },
    'back': { x: 0, y: 0, z: -1 }
}

export interface IKeyMap {
    [index : string] : string
}

const keyMapping : IKeyMap = {
    Home : 'top',
    ArrowLeft : 'left',
    PageUp : 'bottom',
    ArrowRight : 'right',
    End : 'front',
    PageDown : 'back',
}

const onClickView = (camera : Camera) => (dir : string) => () => {

    const ori:Vect3 = orientationValues[dir];
    camera.position.set(ori.x, ori.y, ori.z);
};

const addCameraViewControls = (camera : Camera) => {

    const btnTop:HTMLButtonElement = document.querySelector("#btn_top");
    const btnLeft:HTMLButtonElement = document.querySelector("#btn_left");
    const btnRight:HTMLButtonElement = document.querySelector("#btn_right");
    const btnBottom:HTMLButtonElement = document.querySelector("#btn_bottom");
    const btnFront:HTMLButtonElement = document.querySelector("#btn_front");
    const btnBack:HTMLButtonElement = document.querySelector("#btn_back");

    const onClickViewCamera = onClickView(camera);
    
    document.addEventListener('keyup', 
        (ev : KeyboardEvent) => keyMapping[ev.key] &&
            onClickViewCamera(keyMapping[ev.key])()
    );
    
    btnTop.onclick = onClickViewCamera('top');
    btnLeft.onclick = onClickViewCamera('left');
    btnBottom.onclick = onClickViewCamera('bottom');
    btnRight.onclick = onClickViewCamera('right');
    btnFront.onclick = onClickViewCamera('front');
    btnBack.onclick = onClickViewCamera('back');
};

export default addCameraViewControls;
