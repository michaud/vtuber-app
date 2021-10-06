import { Clock } from "three";
import {
    FolderApi,
    Pane
} from "tweakpane";
import { Update } from "../types/Action";
import { Model } from "../types/model";
import { VoidRunner } from "../types/voidRunner";

type ModelActionHandlers = {
    [index: string]: Update
}

const addModelToUIList = (
    model:Model,
    addModelHandler:VoidRunner,
    modelActionHandlers:ModelActionHandlers,
    pane:FolderApi
) => {

    const buttonList = Object.keys(modelActionHandlers)
        .reduce((acc, item, idx) => {
            if(idx % 2  === 0) {
                acc.push([item])
            } else {
                acc[acc.length -1].push(item);
            }

            return acc;
        },[])

    pane.addButton({
        title: `add ${model.name}`,
    }).on('click', addModelHandler);

    pane.addFolder({
        title: 'actions',
        expanded: false,
    }).addBlade({
        view: 'buttongrid',
        size: [2, buttonList.length],
        cells: (x:number, y:number) => ({
            title: buttonList[y][x],
        }),
/* @ts-ignore typing on tweakerpane is not complete */
    }).on('click', (ev) => ev.cell.title && 
        modelActionHandlers[ev.cell.title]()
    );
};

const addModelInteractions = (models:Model[], threeTime:Clock, pane:Pane) => {

    const folder = pane.addFolder({
        title: 'models',
        expanded: false,
    });
    models.forEach((model:Model) => {

        const modelActionHandlers = Object
            .keys(model.actions)
            .filter(item => item !== 'detections')
            .reduce((acc, key) => ({
                ...acc,
                [key]: () => model.actions[key](null, threeTime.elapsedTime)
            }), {});

        addModelToUIList(
            model,
            () => model.create(),
            modelActionHandlers,
            folder
        )
    });
};

export default addModelInteractions;
