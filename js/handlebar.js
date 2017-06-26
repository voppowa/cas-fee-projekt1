function renderPage() {

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const templateScript = $('#task').html(),
        handlebarTpl = Handlebars.compile(templateScript),
        context = {
            tasks
        },
        compiled = handlebarTpl(context);
    $('#task-wrapper').html(compiled);

    let numberTasks = 0;
        for (let i = 0; i < tasks.length; i++) {
            if (!tasks[i].isFinished) {
                numberTasks++;
            }
        }

    $("#numberOfElements").text(numberTasks);

}

renderPage();

function renderPageFinishedTasks() {

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const templateScript = $('#finished_task').html(),
        handlebarTpl = Handlebars.compile(templateScript),
        context = {
            tasks
        },
        compiled = handlebarTpl(context);
    console.log(tasks);
    $('#task-wrapper').html(compiled);

    let numberTasks = 0;
    for (let i = 0; i < tasks.length; i++) {
        if (!tasks[i].isFinished) {
            numberTasks++;
        }
    }

    $("#numberOfElements").text(numberTasks);

}