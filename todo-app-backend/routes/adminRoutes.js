const express = require("express");
const router = express.Router();
const { getAllUsers, getUserTasks, deleteUserTask,
    getAllTasks,getUserSubTasks,updateTaskByAdmin,updateUserSubTask,deleteSubtaskByAdmin,
    createTaskByAdmin, createSubtaskByAdmin} = require("../controllers/adminController");
const { authenticateUser, authenticateAdmin} = require("../middleware/authMiddleware");
const{getLogs}=require("../controllers/adminController");
const{getSpecificLogs}=require("../controllers/adminController");


router.get("/users",authenticateUser, authenticateAdmin, getAllUsers);
router.get("/tasks",authenticateUser, authenticateAdmin, getAllTasks);
router.get("/users/:userId/tasks",authenticateUser, authenticateAdmin, getUserTasks);
router.get("/users/:userId/subtasks",authenticateUser, authenticateAdmin, getUserSubTasks);
router.put("/tasks/:taskId",authenticateUser, authenticateAdmin, updateTaskByAdmin);
router.put("/tasks/:taskId/subtasks/:subtaskId",authenticateUser,authenticateAdmin,updateUserSubTask)
router.delete("/users/:userId/tasks/:taskId", authenticateUser, authenticateAdmin, deleteUserTask);
router.delete("/tasks/:taskId/subtasks/:subtaskId",authenticateUser, authenticateAdmin, deleteSubtaskByAdmin);
router.post("/tasks/create",authenticateUser,authenticateAdmin,createTaskByAdmin);
router.post("/subtasks/create/:taskId",authenticateUser,createSubtaskByAdmin,createSubtaskByAdmin);

router.get("/logs",authenticateUser,authenticateAdmin,getLogs);

router.get("/logs/:userId",authenticateUser, authenticateAdmin,getSpecificLogs);

module.exports = router;