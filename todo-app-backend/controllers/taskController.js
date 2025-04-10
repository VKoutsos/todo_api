
const logAction = require("../utils/logger");
const notify=require("../utils/notify");
const {queryDatabase}=require("../utils/dbHelpers");

// Get all tasks for a user
exports.getTasks=async(req,res)=> {
    try {
        const userId = req.user.id;
        const tasks = await queryDatabase("SELECT * FROM tasks WHERE user_id=?", [userId]);

        if (tasks.length === 0) return res.status(404).json({message: "No tasks found"});

        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

// Create a new task
exports.createTask=async(req,res)=>{
    try{
        const{title,description}=req.body;
        const userId=req.user.id;

        if(!title) return res.status(400).json({error:"Title is required"});

        const sql="INSERT INTO tasks (user_id,title,description) VALUES (?,?,?)";
        const result=await queryDatabase(sql,[userId,title,description]);

        logAction(userId,`Created task: ${title}`);
        notify(req.user.email,"Task Created",`Task "${title}" has been created. (User ID: ${userId})`);

        res.status(201).json({message:"Task created successfully",taskId:result.insertId});
    }catch(err){
        res.status(500).json({error:err.message});
    }
};

// Update a task
exports.updateTask=async(req,res)=>{
    try{
        const taskId=req.params.id;
        const{title,description}=req.body;
        const userId=req.user.id;

        const sql="UPDATE tasks SET title=?, description=? WHERE id=? AND user_id=?";
        const result=await queryDatabase(sql,[title, description, taskId, userId]);

        if(result.affectedRows===0) return res.status(404).json({error:"Task not found or unauthorized "});

        logAction(userId,`Updated task ID ${taskId}: New Title - ${title}`);
        notify(req.user.email,"Task Updated",`Task "${title}" has been updated. (User ID: ${userId})`);

        res.status(200).json({message:"Task updated successfully"});
    }catch(err){
        res.status(500).json({error:err.message});
    }
};

// Delete a task
exports.deleteTask=async(req,res)=>{
    try{
        const taskId=req.params.id;
        const userId=req.user.id;

        const sql="DELETE FROM tasks WHERE id=? AND user_id=?";
        const result=await queryDatabase(sql,[taskId,userId]);

        if(result.affectedRows===0) return res.status(404).json({error:"Task not found or unauthorized"});

        logAction(userId,`Deleted task ID ${taskId}`);
        notify(req.user.email,"Task Deleted",`Task "${taskId}" has been deleted. (User ID: ${userId})`);

        res.status(200).json({message:"Task deleted successfully"});
    }catch(err){
        res.status(500).json({error:err.message});
    }
};

// Mark task as completed
exports.completeTask =async(req, res) => {
    try{
        const taskId = req.params.id;
        const userId = req.user.id;

        const sql = "UPDATE tasks SET status = 'completed' WHERE id = ? AND user_id = ?";
        const result = await queryDatabase(sql, [taskId, userId]);

        if (result.affectedRows === 0) return res.status(404).json({error: "Task not found or unauthorized"});

        logAction(req.user.id, `Completed task ID ${taskId}`);
        notify(req.user.email, "Task Completed", `Task "${taskId}" has been marked as completed. (User ID: ${userId}) `);

        res.status(200).json({message: "Task marked as completed"});
    }catch(err){
        res.status(500).json({error: err.message});
    }
};