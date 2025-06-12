const express=require('express');
const cors=require('cors');
const http=require('http');
require('dotenv').config();

//import socket.io initialization
const initSocket=require('./socket');

const taskRoutes=require("./routes/taskRoutes");
const authRoutes=require("./routes/authRoutes");
const subtaskRoutes=require("./routes/subtaskRoutes");
const adminRoutes=require("./routes/adminRoutes");
const userRoutes=require("./routes/userRoutes");


const app = express();
const server=http.createServer(app);

const {io,connectedUsers}=initSocket(server);

//attach socket.io to app for use in routes
app.set('io',io);//lets routes access io
app.set('connectedUsers',connectedUsers);//share online users

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
server.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});