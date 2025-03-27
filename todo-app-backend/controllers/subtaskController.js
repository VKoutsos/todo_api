const db=require("../config/db");
const logAction=require("../utils/logger");
const notify=require("../utils/notify");

//get all subtasks for a task
exports.getSubtasks=(req,res)=>{
    const{taskId}=req.params;

    db.query("SELECT subtasks.* FROM subtasks JOIN tasks ON subtasks.task_id=tasks.id WHERE subtasks.task_id=? AND tasks.user_id=?",
        [taskId,req.user.id],(err,results)=>{
        if(err) return res.status(500).json({error:err.message});
        if(results.length===0) return res.status(404).json({ error: "You are not allowed to view these subtasks" });
        res.status(200).json(results);
    });
};

//create a subtask
exports.createSubtask=(req,res)=>{
    const{taskId}=req.params;
    const{description}=req.body;

    if(!description){
        return res.status(400).json({error:"Subtask description is required"});
    }

    db.query("SELECT id FROM tasks WHERE id=? AND user_id=?",[taskId,req.user.id],(err,results)=>{
        if (err) return res.status(500).json({error:err.message});
        if(results.length===0){
            return res.status(403).json({error:"You are not allowed to add subtasks to this task"});
        }

    db.query("INSERT INTO subtasks (task_id,title) VALUES (?,?)",[taskId,description],(err,result)=>{
        if(err) return res.status(500).json({error:err.message});

        logAction(req.user.id,`Created subtask: ${description} for Task ID: ${taskId}`);

        notify(req.user.email,"Subtask created",`Subtask created for Task ID: ${taskId}.`);

        res.status(201).json({message:"Subtask created successfully",subtaskId:result.insertId});
    });
    });
};

//update a subtask
exports.updateSubtask=(req,res)=>{
    const{subtaskId}=req.params;
    const{description}=req.body;

    db.query("SELECT subtasks.id FROM subtasks JOIN tasks ON subtasks.task_id=tasks.id WHERE subtasks.id=? AND tasks.user_id=?",
        [subtaskId,req.user.id],(err,results)=>{
        if(err) return res.status(500).json({error:err.message});
        if(results.length===0) return res.status(403).json({error:"You are not allowed to update this subtask"});


    db.query("UPDATE subtasks SET title=? WHERE id=?",[description,subtaskId],(err,result)=>{
        if(err) return res.status(500).json({error:err.message});
        if(result.affectedRows===0) return res.status(404).json({error:"Subtask not found"});

        logAction(req.user.id,`Updated subtask ${subtaskId}`)

        notify(req.user.email,"Subtask updated",`Subtask ID: ${subtaskId} has been updated.`)

        res.status(200).json({message:"Subtask updated successfully"});
    });
    });
};

//mark a subtask as completed
exports.completeSubtask=(req,res)=>{
    const{subtaskId}=req.params;

    db.query("SELECT subtasks.id FROM subtasks JOIN tasks ON subtasks.task_id=tasks.id WHERE subtasks.id=? AND tasks.user_id=?",
        [subtaskId,req.user.id],(err,results)=>{
            if(err) return res.status(500).json({error:err.message});
            if(results.length===0) return res.status(403).json({error:"You are not allowed to complete this subtask"});

    db.query("UPDATE subtasks SET status='completed' WHERE id=?",[subtaskId],(err,result)=>{
        if (err) return res.status(500).json({error:err.message});
        if(result.affectedRows===0) return res.status(404).json({error:"Subtask not found"});

        logAction(req.user.id,`Completed subtask ${subtaskId}`);

        notify(req.user.email,"Subtask completed",`Subtask ID: ${subtaskId} has been marked as completed.`);

        res.status(200).json({message:"Subtask marked as completed"});
    });
    });
};

//delete a subtask
exports.deleteSubtask=(req,res)=>{
    const{subtaskId}=req.params;

    db.query("SELECT subtasks.id FROM subtasks JOIN tasks ON subtasks.task_id=tasks.id WHERE subtasks.id=? AND tasks.user_id=?",
        [subtaskId,req.user.id],(err,results)=>{
            if(err) return res.status(500).json({error:err.message});
            if(results.length===0) return res.status(403).json({error:"You are not allowed to delete this subtask"});

    db.query("DELETE FROM subtasks WHERE id=?",[subtaskId],
        (err,result)=>{
        if (err) return res.status(500).json({error:err.message});
        if(result.affectedRows===0) return res.status(404).json({error:"Subtask not found"});

        logAction(req.user.id,`Deleted subtask ${subtaskId}`);

        notify(req.user.email,"Subtask deleted",`Subtask ID: ${subtaskId} has been deleted successfully.`);

        res.status(200).json({message:"Subtask deleted successfully"});
    });
    });
};


//CAN ACCESS OTHER USERS SUBTASKS!! (CAN BE FIXED BUT NOT IMPORTANT RIGHT NOW)