import addBloomPass from "./bloom/addBloomPass";
import addDotScreenPass from "./dotScreen/addDotScreenPass";
import addGodRaysPass from "./dogray/addGodRaysPass";
import addSobolPass from "./sobol/addSobolPass";
import addAfterImagePass from "./afterImage/addAfterImagePass";

export const passes = [
    addSobolPass,
    addBloomPass,
    addDotScreenPass,
    addAfterImagePass,
    addGodRaysPass
];
