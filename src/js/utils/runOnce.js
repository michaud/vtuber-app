export const runOnce = (fn) => {

    let fncall = fn;

    return () => fncall = fncall ? fncall() : undefined;
};
