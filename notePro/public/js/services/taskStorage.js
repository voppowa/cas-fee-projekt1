;(function(services) {
    function setItem(tasks) {
        if (tasks) {
            localStorage.setItem(tasks, JSON.stringify("tasks"));
        }
        else {
            localStorage.removeItem(tasks);
        }
    }

    function getItem(tasks) {
        return JSON.parse(localStorage.getItem(tasks) || null);
    }

    services.taskStorage = {getItem, setItem};
}(window.services = window.services || { }));