;(function(services, $) {

    const ajaxUtil = window.util.ajax;
    const taskStorage = window.services.taskStorage;


    function createTask(title, description, deadline) {
        return ajaxUtil.ajax("POST", "/tasks/", {title: title, description: description, deadline: deadline});
    }

    function getTasks() {
        return ajaxUtil.ajax("GET", "/tasks/", undefined);
    }

    function getTask(taskID) {
        return ajaxUtil.ajax("GET", `/tasks/${taskID}`, undefined);
    }

    function deleteTask(taskID) {
        return ajaxUtil.ajax("DELETE", `/tasks/${taskID}`, undefined);
    }

    services.restClient = {
        createTask: createTask,
        getTasks,
        getTask,
        deleteTask
    };
}(window.services = window.services || { }, jQuery));