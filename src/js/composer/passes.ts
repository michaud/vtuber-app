import addBloomPass from "./bloom/addBloomPass";
import addDotScreenPass from "./dotScreen/addDotScreenPass";
import addGodRaysPass from "./dogray/addGodRaysPass";
import addSobolPass from "./sobol/addSobolPass";

export const passes = [
    addSobolPass,
    addBloomPass,
    addDotScreenPass,
    addGodRaysPass
];
