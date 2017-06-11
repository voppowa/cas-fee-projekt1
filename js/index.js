// Tasks
let tasks = localStorage.getItem("tasks");

if( !tasks )
{
    localStorage.setItem("tasks", JSON.stringify([]));
    tasks = localStorage.getItem("tasks");
}
tasks = JSON.parse(tasks);

;(function ($) {

    function renderPage() {

        const templateScript = $('#task').html(),
            handlebarTpl = Handlebars.compile(templateScript),
            context = {
                tasks
            },
            compiled = handlebarTpl(context);
        $('#task-wrapper').html(compiled);

        let numberTasks = tasks.length == 0 ? "no" : tasks.length;
        $("#numberOfElements").text(numberTasks);

    }

    renderPage();


    function renderPageFinishedTasks() {

        const templateScript = $('#finished_task').html(),
            handlebarTpl = Handlebars.compile(templateScript),
            context = {
                tasks
            },
            compiled = handlebarTpl(context);
        console.log(tasks);
        $('#task-wrapper').html(compiled);

        let numberTasks = tasks.length == 0 ? "no" : tasks.length;
        $("#numberOfElements").text(numberTasks);

    }

    // Style Changer
    $(document).on('click', '#style_changer', () => changeStyle());

    // Sort Functions
    $(document).on('click', '.deadlineDate', () => sortAndRerender(sortByDeadline));
    $(document).on('click', '.creationDate', () => sortAndRerender(sortByCreationDate));
    $(document).on('click', '.taskImportance', () => sortAndRerender(sortByImportance));

    // Remove Task
    $(document).on('click', '.remove', () => removeTask());
    $(document).on('click', '#finished', () => finishedTask());

    // Show Finished
    $(document).on('click', '.finished_notes', () => showFinished());

    // Edit Task
    $(document).on('click', '.task-text', () => editTaskDescription());


    function changeStyle() {
        $('body').toggleClass('change_style');
    }

    function sortAndRerender(sortAlgo) {
        tasks.sort(sortAlgo);
        renderPage();
    }

    function sortByDeadline(a, b) {
        return new Date(a.deadline) - new Date(b.deadline);
    }

    function sortByCreationDate(a, b) {
        return new Date(a.creationDate) - new Date(b.creationDate);
    }

    function sortByImportance(a, b) {
        return b.importance.length - a.importance.length;
    }

    function removeTask() {
        const title = event.target.parentNode.parentNode.parentNode.firstElementChild.firstElementChild.nextElementSibling.innerHTML;
        const index = tasks.findIndex(x => x.title == title);
        tasks.splice(index, 1);
        localStorage.removeItem(tasks[index]);
        renderPage();
    }

    function finishedTask() {
        const title = event.target.parentNode.parentNode.parentNode.firstElementChild.firstElementChild.nextElementSibling.innerHTML;
        const index = tasks.findIndex(x => x.title == title);
        tasks[index].isFinished = true;
        tasks.splice(index, 1);
        renderPage();
    }

    function showFinished() {
        renderPageFinishedTasks();
    }

    // Edit Task Description by clicking in the field
    function editTaskDescription() {
        console.log('edit clicked');
        const editTaskDescription = event.target.parentNode.parentNode.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling;
        $(editTaskDescription).attr('contenteditable','true').addClass('active');
        $(".task-text").on('keyup', function (e) {
            if (e.keyCode == 13) {
                const newText = $(editTaskDescription).text();
                const title = event.target.parentNode.parentNode.firstElementChild.firstElementChild.nextElementSibling.innerHTML;
                const index = tasks.findIndex(x => x.title == title);
                tasks[index].description = newText;
                $(editTaskDescription).attr('contenteditable','false').removeClass('active');
            }
        });
    }

    // TODO: Edit Task


})(jQuery);




