import { Model } from "types/model";
import { VoidRunner } from "types/voidRunner";
import { Scene } from "three";
import {
    FolderApi,
    Pane
} from "tweakpane";

type ModelActionHandlers = {
    [index: string] : VoidRunner
}

const addModelToUIList = (
    model : Model,
    addModelHandler : VoidRunner,
    modelActionHandlers : ModelActionHandlers,
    pane : FolderApi
) => {

    const buttonList = Object.keys(modelActionHandlers)
        .reduce((acc, item, idx) => {
            if(idx % 2  === 0) {
                acc.push([item])
            } else {
                acc[acc.length -1].push(item);
            }

            return acc;
        },[]);

    pane.addButton({
        title: `add ${model.name}`,
    }).on('click', addModelHandler);

    pane.addFolder({
        title: 'actions',
        expanded: false,
    }).addBlade({
        view: 'buttongrid',
        size: [2, buttonList.length],
        cells: (x : number, y : number) => ({
            title: buttonList[y][x],
        }),
/* @ts-ignore tweakerpane doesn't see the on event here but it's there */
    }).on('click', (ev) => ev.cell.title && 
        modelActionHandlers[ev.cell.title]()
    );
};

const addIfAbsent = (
    scene:Scene,
    model: Model
) => () => {

    if(!scene.children.find(item=> item.name === model.name)) {
        model.create()
    }
};

const addModelInteractions = (
    models : Model[],
    scene : Scene,
    pane:Pane,
    folderLabel: string
) => {

    const folder = pane.addFolder({
        title: folderLabel,
        expanded: false,
    });

    models.forEach((model : Model) => {

        const modelActionHandlers = Object
            .keys(model.actions)
            .reduce((acc, key) => ({
                ...acc,
                [key]: () => model.actions[key]()
            })
            , {});

        addModelToUIList(
            model,
            addIfAbsent(scene, model),
            modelActionHandlers,
            folder
        )
    });
};

export default addModelInteractions;
