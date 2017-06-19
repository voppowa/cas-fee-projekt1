
;(function ($) {
    "use strict"

    // Style Changer
    $(document).on('click', '#style_changer', () => changeStyle());

    // Sort Functions
    $(document).on('click', '.deadlineDate', () => sortAndRerender(sortByDeadline));
    $(document).on('click', '.creationDate', () => sortAndRerender(sortByCreationDate));
    $(document).on('click', '.taskImportance', () => sortAndRerender(sortByImportance));

    // Remove Task
    $(document).on('click', '.remove', function() {
        const id = $(this).parent().parent().parent().attr('id');
        removeTask(id);
    });

    $(document).on('click', '#finished', function() {
        const id = $(this).parent().parent().parent().attr('id');
        finishedTask(id);
    });

    // Show Finished
    $(document).on('click', '.finished_notes', () => showFinished());

    // Edit Task Title
    $(document).on('click', '.task-title > h3', function() {
        const id = $(this).parent().parent().attr('id');
        console.log(id);
        editTaskTitle(id);
    });

    // Edit Task Text
    $(document).on('click', '.task-text', function() {
        const id = $(this).parent().parent().attr('id');
        editTaskDescription(id);
    });

    // Edit Task Deadline
    $(document).on('click', '.deadline', function() {//
        const id = $(this).parent().parent().attr('id');
        const deadlineInput = $(this).parent().children('#deadline');
        editDeadline(id, deadlineInput);
    });

    // Edit Task Importance
    $(document).on('click', '.importance', function() {
        const id = $(this).parent().parent().attr('id');
        editImportance(id);
    });


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

})(jQuery);




