import { VoidRunner } from "types/voidRunner";

export const runOnce = (fn:VoidRunner):VoidRunner => {

    let fncall:VoidRunner = fn;

    return () => {

        if(fncall !== null) {

            fncall();

        } else {

            fncall = null
        }
    }
};
