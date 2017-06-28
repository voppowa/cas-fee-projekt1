;(function ($) {
    "use strict"

    // Style Changer
    $(document).on('click', '#style_changer', () => taskStorage.changeStyle());

    // Sort Functions
    $(document).on('click', '.deadlineDate', () => taskStorage.sortAndRerender(taskStorage.sortByDeadline));
    $(document).on('click', '.creationDate', () => taskStorage.sortAndRerender(taskStorage.sortByCreationDate));
    $(document).on('click', '.taskImportance', () => taskStorage.sortAndRerender(taskStorage.sortByImportance));

    // Remove Task
    $(document).on('click', '.remove', function() {
        const id = $(this).parent().parent().parent().attr('id');
        taskStorage.removeTask(id);
    });

    $(document).on('click', '#finished', function() {
        const id = $(this).parent().parent().parent().attr('id');
        taskStorage.finishedTask(id);
    });

    // Show Finished
    $(document).on('click', '.finished_notes', () => taskStorage.showFinished());

    // Edit Task Title
    $(document).on('click', '.titleEdit', function() {
        const id = $(this).parent().parent().parent().attr('id');
        taskStorage.editTaskTitle(id);
    });

    // Edit Task Text
    $(document).on('click', '.descriptionEdit', function() {
        const id = $(this).parent().parent().parent().attr('id');
        taskStorage.editTaskDescription(id);
    });

    // Edit Task Deadline
    $(document).on('click', '.deadlineIcon', function() {//
        const id = $(this).parent().parent().parent().attr('id');
        const deadlineInput = $(this).parent().parent().children('#deadline');
        taskStorage.editDeadline(id, deadlineInput);
    });

    // Edit Task Importance
    $(document).on('click', '.importance', function() {
        const id = $(this).parent().parent().attr('id');
        taskStorage.editImportance(id);
    });


})(jQuery);




