let taskStorage = (function() {
    "user strict";
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


    class Task {
        constructor(title, description, deadline) {
            this.taskID = (new Date).getTime();
            this.creationDate = new Date();
            this.title = title;
            this.description = description;
            this.deadline = deadline;
            this.importance = Array.from({length: $("#hiddenImportance").val()}, (v, k) => k);
            this.isFinished = false;
        }
    }

    function updateStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function changeStyle() {
        if ($('body').hasClass("change_style")) {
            $('body').removeClass('change_style');
            localStorage.setItem("style", JSON.stringify("other_style"));
        } else {
            $('body').addClass('change_style');
            localStorage.setItem("style", JSON.stringify("change_style"));
        }
    }

    function sortAndRerender(sortAlgo) {
        tasks.sort(sortAlgo);
        updateStorage();
        renderPage();
    }

    function sortByDeadline(a, b) {
        return (new Date(a.deadline) - new Date(b.deadline));
    }

    function sortByCreationDate(a, b) {
        return (new Date(a.creationDate) - new Date(b.creationDate));
    }

    function sortByImportance(a, b) {
        return (b.importance.length - a.importance.length);
    }

    function removeTask(id) {
        const index = tasks.findIndex(x => x.taskID == id);
        tasks.splice(index, 1);
        updateStorage();
        renderPage();
    }

    function finishedTask(id) {
        const index = tasks.findIndex(x => x.taskID == id);
        tasks[index].isFinished  = !tasks[index].isFinished;
        updateStorage();
        renderPage();
    }

    function showFinished() {
        renderPageFinishedTasks();
    }

// Edit Deadline By clicking on the icon
    function editDeadline(id, deadlineInput) {
        const oldDeadline = event.target.parentNode;
        const editDeadline = oldDeadline.firstElementChild;
        const index = tasks.findIndex(x => x.taskID == id);

        if (!tasks[index].isFinished) {
            if (!$(editDeadline).hasClass('index_hide')) {
                $(deadlineInput).html('').show().siblings('input');
                $(oldDeadline).hide();
                $(deadlineInput).val(editDeadline.innerHTML);

                $(deadlineInput).on('keyup', function (e) {
                    if (e.keyCode == 13 || e.keyCode == 9) {
                        const newDeadline = $(deadlineInput).val();
                        tasks[index].deadline = newDeadline;
                        $(deadlineInput).css("display", "none");
                        $(oldDeadline).show();
                        $(editDeadline).show().html(newDeadline);
                        updateStorage();                    }
                });
            }
        }
    }

// Edit Task Title by clicking on the icon
    function editTaskTitle(id) {
        const editTaskTitle = event.target.parentNode.firstElementChild;
        const index = tasks.findIndex(x => x.taskID == id);

        $('.titleEdit').hide();

        if (!tasks[index].isFinished) {
            $(editTaskTitle).attr('contenteditable', 'true').addClass('active');
            $('.task-title > h3 > span').on('keydown', function (e) {
                if (e.which == 13) {
                    return false;
                }
            });
            $(".task-title > h3 > span").on('keyup', function (e) {
                if (e.keyCode == 13 || e.keyCode == 9 && newText != null) {
                    const newText = $(editTaskTitle).text();
                    tasks[index].title = newText;
                    updateStorage();
                    $(editTaskTitle).attr('contenteditable', 'false').removeClass('active');
                    $('.titleEdit').show();
                }
            });
        }
    }

// Edit Task Description by clicking on the icon
    function editTaskDescription(id) {
        const editTaskDescription = event.target.parentNode.firstElementChild;
        const index = tasks.findIndex(x => x.taskID == id);
        $('.descriptionEdit').hide();


        if (!tasks[index].isFinished) {
            $(editTaskDescription).attr('contenteditable', 'true').addClass('active');
            $('.task-text > span').on('keydown', function (e) {
                if (e.which == 13) {
                    return false;
                }
            });
            $(".task-text > span").on('keyup', function (e) {
                if (e.keyCode == 13 || e.keyCode == 9 && (newText != null)) {
                    const newText = $(editTaskDescription).text();
                    tasks[index].description = newText;
                    updateStorage();
                    $(editTaskDescription).attr('contenteditable', 'false').removeClass('active');
                    $('.descriptionEdit').show();
                }
            });
        }
    }


// Edit Importance by clicking on the bolts
    function editImportance(id) {
        const index = tasks.findIndex(x => x.taskID == id);
        const importanceWrapper = event.target.parentNode;
        const importanceInput = event.target.parentNode.nextElementSibling;
        if (!tasks[index].isFinished) {
            $('.gold div').addClass('bolt');
            $(importanceWrapper).css('display', 'none');
            $(importanceInput).removeClass('index_hide').addClass('rating');

            if (importanceInput != null) {
                $(importanceInput.childNodes).click(function () {
                    var starId = $(this).attr('value');
                    const newImportance = Array.from({length: starId}, (v, k) => k);
                    tasks[index].importance = newImportance;
                    updateStorage();
                    renderPage();
                });
            }
        }
    }

    function saveTask() {
        let title = $("#title").val();
        let description = $("#description").val();
        let deadline = $("#deadline").val();

        let newTask = new Task(title, description, deadline, importance);
        window.location.replace("index.html");
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    return {
        updateStorage: updateStorage,
        changeStyle: changeStyle,
        sortAndRerender: sortAndRerender,
        sortByDeadline: sortByDeadline,
        sortByCreationDate: sortByCreationDate,
        sortByImportance: sortByImportance,
        removeTask: removeTask,
        finishedTask: finishedTask,
        showFinished: showFinished,
        editDeadline: editDeadline,
        editTaskTitle: editTaskTitle,
        editTaskDescription: editTaskDescription,
        editImportance: editImportance,
        saveTask: saveTask
    }

}());


