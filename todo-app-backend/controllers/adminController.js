
const logAction=require("../utils/logger");
const {getTaskOwner,getSubtaskOwner,getTaskOwnerEmail}=require("../utils/dbHelpers");
const notify=require("../utils/notify");
const {queryDatabase}=require("../utils/dbHelpers");

// Get all users (Admin Only)
exports.getAllUsers =async(req, res) => {
    try {
        const users = await queryDatabase("SELECT id, username, email, role FROM users");
        res.status(200).json(users);
    }catch(err){
        res.status(500).json({error:err});
    }
};

//get all tasks
exports.getAllTasks=async(req,res)=> {
    try {
        const tasks = await queryDatabase("SELECT * FROM tasks");
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({error: err});
    }
};


// Get all tasks of a specific user
exports.getUserTasks =async(req, res) => {
    const { userId } = req.params;
    try {
        const tasks = await queryDatabase("SELECT * FROM tasks WHERE user_id = ?", [userId]);
        if (tasks.length === 0) return res.status(404).json({message: "No tasks found for this user"});

        res.status(200).json(tasks);
    }catch(err){
    res.status(500).json({error:err});
    }
};



//get all subtasks of a user
exports.getUserSubTasks = async(req, res) => {
    const{userId} = req.params;
    try {
        const subtasks = await queryDatabase("SELECT subtasks.*FROM subtasks JOIN tasks ON subtasks.task_id=tasks.id WHERE tasks.user_id = ?", [userId]);
        res.status(200).json(subtasks);
    }catch(err){
    res.status(500).json({error:err});
    }
};



//create a new task for a user
exports.createTaskByAdmin=(req,res)=>{
    const{title,description,userId}=req.body;

    if(!title||!userId){
        return res.status(400).json({error:"Title and user ID are required"});
    }

    db.query("INSERT INTO tasks (title,description,user_id) VALUES (?,?,?)",[title,description,userId],
        (err, results) => {
            if (err) return res.status(500).json({error: err.message});

            getTaskOwnerEmail(results.insertId, (err, userEmail) => {
                if (err) return res.status(500).json({error: err.message});
                if (!userEmail) return res.status(404).json({error: "Task not found"});


            logAction(userId, `Admin has created a new task: ${title}.`);

            notify(userEmail, "New Task Created", `Admin has created a new task: "${title}" for user: ${userId}.`);
        });
            res.status(201).json({message:"Task created successfully by admin",taskId: results.insertId});
    });
};

//create a new subtask for a user
exports.createSubtaskByAdmin=(req,res)=>{
    const {taskId}=req.params;
    const{description,userId}=req.body;

    getTaskOwnerEmail(taskId,(err,userEmail)=>{
        if (err) return res.status(500).json({error:err.message});
        if(!userEmail) return res.status(404).json({error:"Task not found"});

    if(!description||!userId) {
        return res.status(400).json({error: "Description and user ID are required"});
    }

    db.query("INSERT INTO subtasks (task_id,title) VALUES (?,?)",[taskId,description],(err, results) => {
        if (err) return res.status(500).json({error: err.message});

        notify(userEmail,"Subtask Created",`Admin has created a new Subtask: "${description}" under Task ID: ${taskId}.`);

        logAction(userId, `Admin has created a new subtask under Task ID: ${taskId}.`);

        res.status(201).json({message:"Subtask created successfully by admin",subtaskId:results.insertId});
    });
    });
};

//update any user's task
exports.updateTaskByAdmin = (req, res) => {
    const {taskId} = req.params;
    const {title, description, status} = req.body;

    getTaskOwner(taskId, (err, user_id) => {
        if (err) return res.status(500).json({error: "Database error"});
        if (!user_id) return res.status(404).json({error: "Task not found"});

    getTaskOwnerEmail(taskId,(err,userEmail)=>{
        if (err) return res.status(500).json({error:err.message});
        if(!userEmail) return res.status(404).json({error:"Task not found"});

    db.query("UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?",
        [title, description, status, taskId], (err, result) => {
            if (err) return res.status(500).json({error: err.message});
            if (result.affectedRows === 0) return res.status(404).json({error: "Task not found"});

            logAction(user_id, `Admin updated Task ID ${taskId}`);

            notify(userEmail, "Task Updated", `Admin has updated your task with ID "${taskId}": ${title}.`);

            res.status(200).json({message: "Task updated successfully"});
        });
        });
    });
};

//update any user's subtask
exports.updateUserSubTask=(req,res)=>{
    const{taskId,subtaskId}=req.params;
    const{title}=req.body;

    getTaskOwnerEmail(taskId,(err,userEmail)=>{
        if (err) return res.status(500).json({error:err.message});
        if(!userEmail) return res.status(404).json({error:"Task not found"});

    if(!title){
        return res.status(400).json({error:"Subtask title is required"});
    }

    getSubtaskOwner(subtaskId,(err,user_id)=>{
        if (err) return res.status(500).json({error:"Database error"});
        if (!user_id) return res.status(404).json({error: "Subtask not found"});


    db.query("UPDATE subtasks SET title=? WHERE id=? AND task_id=?",
        [title,subtaskId,taskId],
        (err, result) => {
            if (err) return res.status(500).json({error: err.message});

            if (result.affectedRows === 0) {
                return res.status(404).json({error: "Subtask not found"});
            }
            logAction(user_id, `Admin updated Subtask ID ${subtaskId} under Task ID ${taskId}`);

            notify(userEmail, "Subtask updated", `Admin has updated Subtask ID ${subtaskId}: "${title}".`);

            res.status(200).json({message: "Subtask updated successfully"});
        });
        });
    });
};


// Delete a specific task of any user
exports.deleteUserTask = (req, res) => {
    const { userId, taskId } = req.params;

    getTaskOwnerEmail(taskId,(err,userEmail)=>{
        if (err) return res.status(500).json({error:err.message});
        if (!userEmail) return res.status(404).json({error:"Task not found"});


    db.query("DELETE FROM tasks WHERE id = ? AND user_id = ?", [taskId, userId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Task not found or already deleted" });

        logAction(userId,`Admin deleted Task ID ${taskId}`);

        notify(userEmail,"Task Deleted",`Admin has deleted your (ID:${userId}) task with ID: ${taskId}.`);

      res.status(200).json({ message: "Task deleted successfully" });
    });
    });
};

//delete any user's subtask
exports.deleteSubtaskByAdmin=(req,res)=>{
    const{subtaskId} = req.params;
    const{taskId}=req.params;

    getTaskOwnerEmail(taskId,(err,userEmail)=>{
        if (err) return res.status(500).json({error:err.message});
        if (!userEmail) return res.status(404).json({error:"Task not found"});

    getSubtaskOwner(subtaskId,(err,user_id)=> {
        if (err) return res.status(500).json({error: "Database error"});
        if (!user_id) return res.status(404).json({error: "Subtask not found"});

        db.query("DELETE FROM subtasks WHERE id=?", [subtaskId], (err, result) => {
            if (err) return res.status(500).json({error: err.message});
            if (result.affectedRows === 0) return res.status(404).json({error: "Subtask not found"});

            logAction(user_id, `Admin deleted Subtask ID ${subtaskId} under Task ID ${taskId}`);

            notify(userEmail, "Subtask deleted", `Admin has deleted your (ID:${user_id}) subtask with ID: ${subtaskId}.`);

            res.status(200).json({message: "Subtask deleted successfully"});
        });
        });
    });
};

//fetch all logs
exports.getLogs=(req,res)=>{
    db.query("SELECT logs.id,users.username,logs.action,logs.timestamp FROM logs INNER JOIN users ON logs.user_id=users.id ORDER BY logs.timestamp DESC",
        (err,results) => {
        if(err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
        }
    );
};

//fetch single user logs
exports.getSpecificLogs=(req,res)=>{
    const {userId}=req.params;
    db.query("SELECT id, action, timestamp FROM logs WHERE user_id=? ORDER BY timestamp DESC",
        [userId],
        (err,results)=>{
            if(results.length===0) return res.status(404).json({error:"User has no logs or doesn't exist"});
            if (err) return res.status(500).json({error:err.message});
            res.status(200).json(results);
        });
};


