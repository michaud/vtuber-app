import { PassUIInteractions } from "types/PassInteractions";
import addBloomUI from "./addBloomUI";
import addDotScreenUI from "./addDotScreenUI";
import addSobolUI from "./addSobolUI";

export const passUIInteractions : PassUIInteractions = {
    'sobolPass': addSobolUI,
    'dotScreenPass': addDotScreenUI,
    'bloomPass': addBloomUI
}

