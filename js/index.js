
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


})(jQuery);




