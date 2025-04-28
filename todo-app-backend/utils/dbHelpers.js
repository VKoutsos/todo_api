const db=require("../config/db");

exports.getTaskOwner=(taskId)=>{
    return new Promise((resolve,reject)=>{
        db.query("SELECT user_id FROM tasks WHERE id=?",[taskId],(err,result)=>{
            if(err) return reject(err);
            if(result.length===0) return resolve(null);//task not found
            resolve(result[0].user_id);
        });
    });
};

exports.getSubtaskOwner = (subtaskId) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT tasks.user_id FROM tasks JOIN subtasks ON tasks.id = subtasks.task_id WHERE subtasks.id = ?",
            [subtaskId],
            (err, result) => {
                if (err) return reject(err);
                if (result.length === 0) return resolve(null); // Subtask not found
                resolve(result[0].user_id);
            }
        );
    });
};

exports.getTaskOwnerEmail = (taskId) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT users.email FROM tasks JOIN users ON tasks.user_id = users.id WHERE tasks.id = ?",
            [taskId],
            (err, result) => {
                if (err) return reject(err);
                if (result.length === 0) return resolve(null);
                resolve(result[0].email);
            }
        );
    });
};

exports.getSubtaskOwnerEmail = (subtaskId) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT users.email FROM subtasks JOIN tasks ON subtasks.task_id = tasks.id JOIN users ON tasks.user_id = users.id WHERE subtasks.id = ?",
            [subtaskId],
            (err, result) => {
                if (err) return reject(err);
                if (result.length === 0) return resolve(null);
                resolve(result[0].email);
            }
        );
    });
};
exports.queryDatabase=(query,params)=>{
    return new Promise((resolve,reject)=>{
        db.query(query,params,(err,results)=>{
            if(err) return reject(err);
            resolve(results);
        });
    });
};