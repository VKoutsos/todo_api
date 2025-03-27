const express=require("express");
const router=express.Router();
const{authenticateUser}=require("../middleware/authMiddleware");
const{getUserLogs}=require("../controllers/userController");

router.get("/logs",authenticateUser,getUserLogs);

module.exports=router;