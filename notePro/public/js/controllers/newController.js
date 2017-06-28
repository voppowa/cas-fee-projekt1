// Send new Task
;(function ($) {
    "use strict";
    const client = window.services.restClient;

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
    //$(document).on('click', '#save', () => saveTask());
    $('.new_task').submit(function (event) {
        event.preventDefault();


        //function saveTask() {
        let title = $("#title").val();
        let description = $("#description").val();
        let deadline = $("#deadline").val();

        let newTask = new Task(title, description, deadline);
        console.log(newTask);


        client.createTask(newTask).then(x => {
            debugger;
            //window.location.replace("index.html");
        });



        //let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        //tasks.push(newTask);
        //localStorage.setItem('tasks', JSON.stringify(tasks));
    });


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



