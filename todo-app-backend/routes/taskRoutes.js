const express=require('express');
const{getTasks,createTask,updateTask,deleteTask,completeTask,incompleteTask}=require('../controllers/taskController');
const{authenticateUser}=require('../middleware/authMiddleware');

const router=express.Router();

// Task Routes
router.post("/create",authenticateUser,createTask); //Create a new task
router.get("/",authenticateUser,getTasks); //Get all tasks for the logged-in user
router.put("/update/:id",authenticateUser,updateTask);
router.delete("/delete/:id",authenticateUser,deleteTask);
router.put("/complete/:id",authenticateUser,completeTask);
router.put("/incomplete/:id",authenticateUser,incompleteTask);

module.exports=router;


