import { PassUIInteractions } from "types/PassInteractions";
import addAfterimageUI from "./addAfterimageUI";
import addBloomUI from "./addBloomUI";
import addDotScreenUI from "./addDotScreenUI";
import addGlitchUI from "./addGlitchUI";
import addGodRayUI from "./addGodRayUI";
import addSobolUI from "./addSobolUI";

export const passUIInteractions : PassUIInteractions = {
    'sobolPass': addSobolUI,
    'dotScreenPass': addDotScreenUI,
    'bloomPass': addBloomUI,
    'afterimagePass': addAfterimageUI,
    'godRayPass': addGodRayUI,
    'glitchPass': addGlitchUI
}

