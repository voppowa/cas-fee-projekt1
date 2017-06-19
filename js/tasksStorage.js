let tasks = localStorage.getItem("tasks");

if( !tasks )
{
    localStorage.setItem("tasks", JSON.stringify([]));
    tasks = localStorage.getItem("tasks");
}
tasks = JSON.parse(tasks);

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

function removeTask(id) {
    const index = tasks.findIndex(x => x.taskID == id);
    tasks.splice(index, 1);
    localStorage.removeItem(tasks[index]);
    renderPage();
}

function finishedTask(id) {
    console.log(id)
    const index = tasks.findIndex(x => x.taskID == id);
    tasks[index].isFinished  = !tasks[index].isFinished;
    //tasks.splice(index, 1);
    renderPage();
}

function showFinished() {
    renderPageFinishedTasks();
}

// Edit Deadline By clicking on the date
function editDeadline(id, deadlineInput) {
    const editDeadline = event.target;
    const index = tasks.findIndex(x => x.taskID == id);

    if(!$(editDeadline).hasClass('index_hide')){
        $(deadlineInput).html('').show().siblings('input');
        $(editDeadline).hide();
        $(deadlineInput).val(editDeadline.innerHTML);
        console.log(editDeadline.innerHTML)

        $(deadlineInput).on('keyup', function (e) {
            if (e.keyCode == 13 || e.keyCode == 9) {
                const newDeadline = $(deadlineInput).val();
                tasks[index].deadline = newDeadline;
                $(deadlineInput).css("display", "none");
                $(editDeadline).show().html(newDeadline);
            }
        });
    }
}

// Edit Task Title by clicking in the field
function editTaskTitle(id) {
    const editTaskTitle = event.target;
    const newText = $(editTaskTitle).text();
    const index = tasks.findIndex(x => x.taskID == id);

    $(editTaskTitle).attr('contenteditable','true').addClass('active');
    $('.task-title > h3').on('keydown', function(e) {
        if (e.which == 13) {
            return false;
        }
    });
    $(".task-title > h3").on('keyup', function (e) {
        if (e.keyCode == 13 || e.keyCode == 9 && (newText != null)) {
            tasks[index].title = newText;
            $(editTaskTitle).attr('contenteditable','false').removeClass('active');
        }
    });
}

// Edit Task Description by clicking in the field
function editTaskDescription(id) {
    const editTaskDescription = event.target;
    const newText = $(editTaskDescription).text();
    const index = tasks.findIndex(x => x.taskID == id);

    $(editTaskDescription).attr('contenteditable','true').addClass('active');
    $(".task-text").on('keyup', function (e) {
        if (e.keyCode == 13 || e.keyCode == 9 && (newText != null)) {
            tasks[index].description = newText;
            $(editTaskDescription).attr('contenteditable','false').removeClass('active');
        }
    });
}


// Edit Importance by clicking on the bolts
function editImportance(id) {
    const index = tasks.findIndex(x => x.taskID == id);
    const importanceWrapper = event.target.parentNode;
    const importanceInput = event.target.parentNode.nextElementSibling;

    $('.gold div').addClass('bolt');
    $(importanceWrapper).css('display', 'none');
    $(importanceInput).removeClass('index_hide').addClass('rating');

    if (importanceInput != null) {
        $(importanceInput.childNodes).click(function () {
            var starId = $(this).attr('value');
            const newImportance = Array.from({length: starId}, (v, k) => k);
            tasks[index].importance = newImportance;
            renderPage();
        });
    }
}