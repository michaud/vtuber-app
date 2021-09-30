const addModelToUIList = (
    model,
    addModelHandler,
    modelActionHandlers,
    pane
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
        cells: (x, y) => ({
            title: buttonList[y][x],
        }),
    }).on('click', (ev) => ev.cell.title && 
        modelActionHandlers[ev.cell.title]()
    );
};

const addModelInteractions = (models, threeTime, pane) => {

    const folder = pane.addFolder({
        title: 'models',
        expanded: false,
    });
    models.forEach(model => {

        const modelActionHandlers = Object
            .keys(model.actions)
            .filter(item => item !== 'detections')
            .reduce((acc, key) => ({
                ...acc,
                [key]: () => model.actions[key](threeTime)
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
