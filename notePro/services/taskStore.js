const Datastore = require('nedb');
const db = new Datastore({ filename: './data/task.db', autoload: true });

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

function publicAddTask(title, description, deadline, callback)
{
    let task = new Task(title, description, deadline);
    db.insert(task, function(err, newDoc){
        if(callback){
            callback(err, newDoc);
        }
    });
}

function publicRemove(taskID, callback) {
    db.update({taskID: taskID}, {$set: {"state": "DELETED"}}, {}, function (err, count) {
        publicGet(taskId, callback);
    });
}

function publicAll(callback)
{
    db.find({}), function (err, docs) {
        callback( err, docs);
    };
}

module.exports = {add : publicAddTask, delete : publicRemove, all : publicAll};
