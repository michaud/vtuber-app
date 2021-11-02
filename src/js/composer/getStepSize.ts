const getStepSize = (
    filterLen : number,
    tapsPerPass : number,
    pass : number
) => filterLen * Math.pow( tapsPerPass, - pass );

export default getStepSize;
