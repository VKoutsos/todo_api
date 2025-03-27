const db = require("../config/db");
const logAction = require("../utils/logger");
const notify=require("../utils/notify");

// Get all tasks for a user
exports.getTasks = (req, res) => {
    const userId = req.user.id; // Get user ID from authenticated request

    db.query("SELECT * FROM tasks WHERE user_id=?", [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length===0) return res.status(404).json({message:"No tasks found"});

        res.status(200).json(results);
    });
};

// Create a new task
exports.createTask = (req, res) => {
    const { title, description } = req.body;
    const userId = req.user.id;

    if (!title) return res.status(400).json({ error: "Title is required" });

    const sql = "INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)";

    db.query(sql, [userId, title, description], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        logAction(req.user.id,`Created task: ${title}`); //Log action

        // //send email to user & admin
        notify(req.user.email,"Task Created",`Task "${title}" has been created. (User ID: ${userId})`);

        res.status(201).json({ message: "Task created successfully", taskId: result.insertId });
    });
};

// Update a task
exports.updateTask = (req, res) => {
    const taskId = req.params.id;
    const { title, description } = req.body;
    const userId = req.user.id;

    const sql = "UPDATE tasks SET title = ?, description = ? WHERE id = ? AND user_id = ?";

    db.query(sql, [title, description, taskId, userId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Task not found or unauthorized" });

        logAction(req.user.id,`Updated task ID ${taskId}: New Title - ${title}`);

        // //send email notifications
        notify(req.user.email,"Task Updated",`Task "${title}" has been updated successfully. (User ID: ${userId})`);


        res.status(200).json({ message: "Task updated successfully" });
    });
};

// Delete a task
exports.deleteTask = (req, res) => {
    const taskId = req.params.id;
    const userId = req.user.id;

    const sql = "DELETE FROM tasks WHERE id = ? AND user_id = ?";

    db.query(sql, [taskId, userId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Task not found or unauthorized" });

        logAction(req.user.id,`Deleted task ID ${taskId}`);

        // //send email notification
       notify(req.user.email,"Task Deleted",`Task "${taskId}" has been deleted successfully. (User ID: ${userId})}`);

        res.status(200).json({ message: "Task deleted successfully" });
    });
};

// Mark task as completed
exports.completeTask = (req, res) => {
    const taskId = req.params.id;
    const userId = req.user.id;

    const sql = "UPDATE tasks SET status = 'completed' WHERE id = ? AND user_id = ?";

    db.query(sql, [taskId, userId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Task not found or unauthorized" });


        logAction(req.user.id,`Completed task ID ${taskId}`);
        //
        // //send email notification
        notify(req.user.email,"Task Completed",`Task "${taskId}" has been marked as completed. (User ID: ${userId}) `);

        res.status(200).json({ message: "Task marked as completed" });
    });
};