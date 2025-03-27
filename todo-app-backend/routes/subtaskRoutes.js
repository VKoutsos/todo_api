const express=require("express");
const{
    getSubtasks,
    createSubtask,
    updateSubtask,
    completeSubtask,
    deleteSubtask
}=require("../controllers/subtaskController");
const{authenticateUser}=require('../middleware/authMiddleware');

const router=express.Router();

//subtask routes
router.get('/:taskId',authenticateUser,getSubtasks);
router.post('/create/:taskId',authenticateUser,createSubtask);
router.put('/update/:subtaskId',authenticateUser,updateSubtask);
router.put('/complete/:subtaskId',authenticateUser,completeSubtask);
router.delete('/delete/:subtaskId',authenticateUser,deleteSubtask);

module.exports=router;