
const logAction=require("../utils/logger");
const notify=require("../utils/notify");
const {queryDatabase}=require("../utils/dbHelpers");
const err = require("jsonwebtoken/lib/JsonWebTokenError");

//get all subtasks for a task
exports.getSubtasks=async(req,res)=>{
    const{taskId}=req.params;

    try{
        const results=await queryDatabase("SELECT subtasks.* FROM subtasks JOIN tasks ON subtasks.task_id = tasks.id WHERE subtasks.task_id = ? AND tasks.user_id = ?",
            [taskId,req.user.id]);

        if(results.length===0) {
            return res.status(404).json({error: "You are not allowed to view these subtasks"});
        }
            res.status(200).json(results);
        }catch(err){
            res.status(500).json({error:err.message});
        }
};

//create a subtask
exports.createSubtask=async(req,res)=>{
    const{taskId}=req.params;
    const{description}=req.body;

    if(!description){
        return res.status(400).json({error:"Subtask description is required"});
    }

    try{
        const taskCheck=await queryDatabase("SELECT id FROM tasks WHERE id=? AND user_id=?",[taskId,req.user.id]);

        if(taskCheck.length===0){
            return res.status(403).json({error:"You are not allowed to add subtasks to this task"});
        }

        const result=await queryDatabase("INSERT INTO subtasks (task_id, title) VALUES (?,?)",[taskId,description]);

        logAction(req.user.id,`Created subtask: ${description} for Task ID: ${taskId}`);
        notify(req.user.email,"Subtask created",`Subtask created for Task ID: ${taskId}.`);

        res.status(201).json({message:"Subtask created successfully",subtaskId:result.insertId});
    }catch(err){
        res.status(500).json({error:err.message});
    }
};

//update a subtask
exports.updateSubtask=async(req,res)=>{
    const{subtaskId}=req.params;
    const{description}=req.body;

    try{
        const check=await queryDatabase(
            "SELECT subtasks.id FROM subtasks JOIN tasks ON subtasks.task_id=tasks.id WHERE subtasks.id=? AND tasks.user_id=?",
            [subtaskId,req.user.id]
        );

        if(check.length===0){
            return res.status(403).json({error:"You are not allowed to update this subtask"});
        }

        const result=await queryDatabase("UPDATE subtasks SET title=? WHERE id=?",
            [description,subtaskId]);

        if(result.affectedRows===0){
            return res.status(404).json({error:"Subtask not found"});
        }

        logAction(req.user.id, `Updated subtask ${subtaskId}`);
        notify(req.user.email, "Subtask updated", `Subtask ID: ${subtaskId} has been updated.`);

        res.status(200).json({message:"Subtask updated successfully"});
    }catch(err){
        res.status(500).json({error:err.message});
    }
};


//mark a subtask as completed
exports.completeSubtask=async(req,res)=> {
    const {subtaskId} = req.params;

    try {
        const check = await queryDatabase("SELECT subtasks.id FROM subtasks JOIN tasks ON subtasks.task_id=tasks.id WHERE subtasks.id=? AND tasks.user_id=?",
            [subtaskId, req.user.id]);

        if (check.length === 0) return res.status(403).json({error: "You are not allowed to complete this subtask"});


        const result =await queryDatabase("UPDATE subtasks SET status='completed' WHERE id=?", [subtaskId]);

        if (result.affectedRows === 0) return res.status(404).json({error: "Subtask not found"});

        logAction(req.user.id, `Completed subtask ${subtaskId}`);
     /*   notify(req.user.email, "Subtask completed", `Subtask ID: ${subtaskId} has been marked as completed.`);*/

        res.status(200).json({message: "Subtask marked as completed"});
    } catch (err) {
        res.status(500).json({error:err.message});
    }
};


//delete a subtask
exports.deleteSubtask=async(req,res)=>{
    const{subtaskId}=req.params;

    try{
       const check=await queryDatabase("SELECT subtasks.id FROM subtasks JOIN tasks ON subtasks.task_id=tasks.id WHERE subtasks.id=? AND tasks.user_id=?",
            [subtaskId,req.user.id]);

        if(check.length===0) return res.status(403).json({error:"You are not allowed to delete this subtask"});

        const result=await queryDatabase("DELETE FROM subtasks WHERE id=?",[subtaskId]);

        if(result.affectedRows===0) return res.status(404).json({error:"Subtask not found"});

        logAction(req.user.id,`Deleted subtask ${subtaskId}`);
        notify(req.user.email,"Subtask deleted",`Subtask ID: ${subtaskId} has been deleted successfully.`);

        res.status(200).json({message:"Subtask deleted successfully"});
    }catch{
        res.status(500).json({error:err.message});
    }
};



//CAN ACCESS OTHER USERS SUBTASKS!! (CAN BE FIXED BUT NOT IMPORTANT RIGHT NOW)