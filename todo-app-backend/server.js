const express=require('express');
const cors=require('cors'); //later for angular
require('dotenv').config();


const taskRoutes=require("./routes/taskRoutes");
const authRoutes=require("./routes/authRoutes");
const subtaskRoutes=require("./routes/subtaskRoutes");
const adminRoutes=require("./routes/adminRoutes");
const userRoutes=require("./routes/userRoutes");


const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.get("/",(req,res)=>{
    res.send("Welcome to the To-Do List API!");
});
app.use("/tasks",taskRoutes);
app.use("/auth",authRoutes);
app.use("/subtasks",subtaskRoutes);
app.use("/admin",adminRoutes);
app.use("/users",userRoutes);

//Start Server
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});