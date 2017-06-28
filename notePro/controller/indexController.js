const store = require("../services/taskStore.js");

module.exports.getTasks = function(req, res)
{
    store.all(function (err, tasks) {
        res.json(tasks || {});
    })
};

module.exports.createTask = function(req, res)
{
    let task = store.add(req.body.title, req.body.description, req.body.deadline, function(err, task) {
        res.json(task);
    });
};

module.exports.deleteTask =  function (req, res)
{
    store.delete(req.params.taskID, function(err, task) {
        res.json(task);
    });
};
