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
    $(document).on('click', '.edit', () => editTask());
    $(document).on('click', '.task-text', () => editTaskDescription());
    $(document).on('click', '.task-title > h3', () => editTaskTitle());
    $(document).on('click', '.deadline', () => editDeadline());
    $(document).on('click', '.importance-container', () => editImportance());



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
        const taskId = event.target.parentNode.parentNode.parentNode.firstElementChild.innerHTML;
        console.log(taskId);
        const index = tasks.findIndex(x => x.taskID == taskId);
        tasks.splice(index, 1);
        localStorage.removeItem(tasks[index]);
        renderPage();
    }

    function finishedTask() {
        const taskId = event.target.parentNode.parentNode.parentNode.firstElementChild.innerHTML;
        const index = tasks.findIndex(x => x.taskID == taskId);
        tasks[index].isFinished = true;
        tasks.splice(index, 1);
        renderPage();
    }

    function showFinished() {
        renderPageFinishedTasks();
    }

    //ToDo: Edit Task
    function editTask() {
        console.log('clicked on edit button');

    }

    // Edit Deadline
    function editDeadline() {
        const editDeadline = event.target;
        const deadlineInput = event.target.parentNode.firstElementChild.nextElementSibling;
        const taskId = event.target.parentNode.parentNode.parentNode.firstElementChild.firstElementChild.innerHTML;
        const index = tasks.findIndex(x => x.taskID == taskId);

            if(!$(editDeadline).hasClass('index_hide')){
                $(deadlineInput).html('').show().siblings('input');
                $(editDeadline).hide();
                $(deadlineInput).val(editDeadline.innerHTML);

                $(deadlineInput).on('keyup', function (e) {
                    if (e.keyCode == 13) {
                        const newDeadline = $(deadlineInput).val();
                        tasks[index].deadline = newDeadline;
                        $(deadlineInput).css("display", "none");
                        $(editDeadline).show().html(newDeadline);
                    }
                });
            }
    }

    // Edit Importance
    function editImportance() {
        const editImportance = event.target.parentNode;
        const importanceInput = event.target.parentNode.nextElementSibling;
        const taskId = event.target.parentNode.parentNode.parentNode.parentNode.firstElementChild.innerHTML;
        const index = tasks.findIndex(x => x.taskID == taskId);

            if(!$(editImportance).hasClass('index_hide')) {
                $(importanceInput).removeClass('index_hide').addClass('rating');
                $(editImportance).hide();
                $('.bolt').click(function () {
                    var starId = $(this).attr('value');
                    const newImportance = Array.from({length: starId}, (v, k) => k);
                    tasks[index].importance = newImportance;
                    renderPage();
                    $('.gold div').addClass('bolt');
                });
        }
    }



    //Edit Title
    function editTaskTitle() {
        const editTaskTitle = event.target;
        const newText = $(editTaskTitle).text();
        const taskId = event.target.parentNode.parentNode.parentNode.firstElementChild.firstElementChild.innerHTML;
        const index = tasks.findIndex(x => x.taskID == taskId);

        $(editTaskTitle).attr('contenteditable','true').addClass('active');
        $(".task-title > h3").on('keyup', function (e) {
            if (e.keyCode == 13 && (newText != null)) {
                e.preventDefault();
                tasks[index].title = newText;
                $(editTaskTitle).attr('contenteditable','false').removeClass('active');
            }
        });
    }

    // Edit Task Description by clicking in the field
    function editTaskDescription() {
        const editTaskDescription = event.target;
        const newText = $(editTaskDescription).text();
        const taskId = event.target.parentNode.parentNode.parentNode.firstElementChild.firstElementChild.innerHTML;
        const index = tasks.findIndex(x => x.taskID == taskId);

        $(editTaskDescription).attr('contenteditable','true').addClass('active');
        $(".task-text").on('keyup', function (e) {
            if (e.keyCode == 13 && (newText != null)) {
                tasks[index].description = newText;
                $(editTaskDescription).attr('contenteditable','false').removeClass('active');
            }
        });
    }


})(jQuery);




