const store = require("../services/taskStore.js");

module.exports.createTask = function(req, res) {
    let task = store.add(req.body.title, req.body.description, req.body.importance, req.body.deadline, function(err, task) {
        res.json(task);
    });
};

module.exports.getTasks = function(req, res) {
    store.all(function (err, tasks) {
        res.json(tasks || {});
    })
};

module.exports.getTask = function(req, res){
    store.get(req.params.id, function(err, task) {
        res.json(task);
    });
};

module.exports.editTask = function(req, res) {
    store.edit(req.params.id, req.body.title, req.body.description, req.body.importance, req.body.deadline, function (err, task) {
        res.json(task);
    });
};

module.exports.finishTask = function(req, res) {
    store.finish(req.params.id, function(err, task) {
        res.json(task);
    });
};

module.exports.deleteTask =  function (req, res)
{
    store.delete(req.params.id, function(err, task) {
        res.json(task);
    });
};