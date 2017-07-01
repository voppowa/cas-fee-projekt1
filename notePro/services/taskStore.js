const Datastore = require('nedb');
const db = new Datastore({ filename: './data/task.db', autoload: true });

class Task {
    constructor(title, description, importance, deadline) {
        this.creationDate = new Date();
        this.title = title;
        this.description = description;
        this.deadline = deadline;
        this.importance = importance;
        this.isFinished = false;
    }
}

function publicAddTask(title, description, importance, deadline, callback) {
    let task = new Task(title, description, importance, deadline);

    db.insert(task, function(err, newDoc){
        if(callback){
            callback(err, newDoc);
        }
    });
}

function editTask(id, title, description, importance, deadline, callback) {
    db.update({_id: id}, {$set: {"title": title, "description": description, "importance": importance, "deadline": deadline}}, {}, function (err, newDoc) {
        callback(err, newDoc);
    })
}

function publicGet(id, callback) {
    db.findOne({ _id: id}, function (err, doc) {
        callback( err, doc);
    });
}

function publicRemove(id, callback) {
    db.remove({_id: id}, {}, function (err, numRemoved) {
        callback( err, numRemoved);
    });
}


function publicAll(callback) {
    db.find({}, function (err, docs) {
        callback( err, docs);
    });
}

function finishTask(id, callback) {
    db.update({_id: id}, {$set: {"isFinished": true}}, {}, function (err, newDoc) {
        callback(err, newDoc);
    })
}

module.exports = {
    add : publicAddTask,
    edit: editTask,
    delete : publicRemove,
    get : publicGet,
    all : publicAll,
    finish: finishTask
};