const addModelToUIList = (model, addModelHandler, modelActionHandlers) => {

    const actionList = document.querySelector("#actionList");
    const detail = document.createElement('details');
    const summary = document.createElement('summary');

    const summaryContent = document.createElement('div');
    summaryContent.classList.add(['title']);
    summaryContent.appendChild(document.createTextNode(model.name));
    summary.appendChild(summaryContent);

    const summaryAction = document.createElement('div');
    summaryAction.classList.add(['action']);
    const button = document.createElement('button');
    button.classList.add(['btn-cv']);
    button.appendChild(document.createTextNode('+'));
    button.onclick = addModelHandler;
    summaryAction.appendChild(button);

    summary.appendChild(summaryAction);

    const content = document.createElement('div');
    content.classList.add(['content']);
    Object.keys(model.actions).map(key => {
        const button = document.createElement('button');
        button.classList.add(['btn-cv']);
        button.onclick = modelActionHandlers[key];

        button.appendChild(document.createTextNode(key))
        content.appendChild(button)
    })

    detail.appendChild(summary);
    detail.appendChild(content);

    const listItem = document.createElement('li');
    listItem.appendChild(detail)
    actionList.appendChild(listItem);
};

export default addModelToUIList;
