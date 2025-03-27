const db=require("../config/db");

exports.getTaskOwner=(taskId,callback)=>{
    db.query("SELECT user_id FROM tasks WHERE id=?",[taskId],(err,result)=>{
        if (err) return callback(err,null);
        if(result.length===0) return callback(null,null);//task not found
        callback(null,result[0].user_id);

    });
};

exports.getSubtaskOwner=(subtaskId,callback)=>{
    db.query("SELECT tasks.user_id FROM tasks JOIN subtasks ON tasks.id=subtasks.task_id WHERE subtasks.id=?",
        [subtaskId],
        (err,result)=>{
        if (err) return callback(err,null);
        if (result.length===0) return callback(null,null);//subtask not found
            callback(null,result[0].user_id);
    });
};

exports.getTaskOwnerEmail=(taskId,callback)=>{
    db.query("SELECT users.email FROM tasks JOIN users ON tasks.user_id=users.id WHERE tasks.id=?",
        [taskId],(err,result)=>{
        if (err) return callback(err,null);
        if(result.length===0) return callback(null,null);
        callback(null,result[0].email);
        });
};

exports.getSubtaskOwnerEmail=(subtaskId,callback)=>{
    db.query("SELECT users.email FROM subtasks JOIN tasks ON subtasks.task_id=tasks.id JOIN users ON tasks.user_id=users.id WHERE subtasks.id=?",
        [subtaskId],(err,result)=>{
        if (err) return callback(err,null);
        if(result.length===0) return callback(null,null);
        callback(null,result[0].email);
        });
};