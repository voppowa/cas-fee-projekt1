;(function(services, $) {

    const ajaxUtil = window.util.ajax;

    function createTask(title, description, importance, deadline) {
        return ajaxUtil.ajax("POST", "/tasks/create/", {title: title, description: description, importance: importance, deadline: deadline});
    }

    function getTasks() {
        return ajaxUtil.ajax("GET", "/tasks/", undefined);
    }

    function getTask(id) {
        return ajaxUtil.ajax("GET", `/tasks/${id}`, undefined);
    }

    function finishTask(id) {
        return ajaxUtil.ajax("PUT", `/tasks/finished/${id}`, undefined);
    }

    function editTask(id, title, description, importance, deadline) {
        return ajaxUtil.ajax("PUT", `/tasks/edit/${id}`, {title: title, description: description, importance: importance, deadline: deadline});
    }

    function deleteTask(id) {
        return ajaxUtil.ajax("DELETE", `/tasks/delete/${id}`, undefined);
    }


    services.restClient = {
        createTask: createTask,
        editTask: editTask,
        getTasks: getTasks,
        getTask: getTask,
        finishTask: finishTask,
        deleteTask
    };
}(window.services = window.services || { }, jQuery));