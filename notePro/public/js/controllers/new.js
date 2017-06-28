// Send new Task
;(function ($) {
    "use strict";
    $(document).on('click', '#save', () => taskStorage.saveTask());
})(jQuery);

/***function addTask() {

    let addTask = function (title, description, deadline) {

        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        let creationDate = new Date();
        let taskID = (new Date).getTime();

        let newTask = {
            'taskID': taskID,
            'creationDate': creationDate,
            'title': $("#title").val(),
            'description': $("#description").val(),
            'importance': Array.from({length: $("#hiddenImportance").val()}, (v, k) => k),
            'deadline': $("#deadline").val(),
            'isFinished': false
        };
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    addTask('taskID', 'creationDate', 'title', 'description', 'importance', 'deadline', 'isFinished');
    window.location.replace("index.html");
} ***/



