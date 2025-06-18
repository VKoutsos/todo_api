const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {queryDatabase}=require("../utils/dbHelpers");
const notify=require("../utils/notify");
require('dotenv').config();

//register a new user
exports.registerUser=async(req,res)=>{
    const{name,email,password}=req.body;

    if(!name||!email||!password){
        return res.status(400).json({error:"All fields are required"});
    }

    try {
        //check if user already exists
        const existingUser = await queryDatabase("SELECT * FROM users WHERE email=?", [email]);

        if (existingUser.length > 0) {
            return res.status(400).json({error: "User already exists"});
        }
        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Insert new user
        await queryDatabase("INSERT INTO users (username,email,password) VALUES (?,?,?)",
            [name, email, hashedPassword]);

        notify(email, "New User Registered", `Hi ${name}! Welcome to my To-Do List Application!`);

        res.status(201).json({message: "User registered successfully"});
    }catch(err){
    res.status(500).json({error:"Server Error"});
    }
};


//User login
exports.loginUser=async(req,res)=>{
    const {email,password}=req.body;

    if(!email||!password){
        return res.status(400).json({error:"Email and password are required"});
    }

    try{
       const userResults=await queryDatabase("SELECT * FROM users WHERE email=?",[email]);

            if (userResults.length===0){
                return res.status(400).json({error:"Invalid credentials"});
            }

            const user=userResults[0];
            //Compare password
            const isMatch=await bcrypt.compare(password,user.password);

            if(!isMatch){
                return res.status(400).json({error:"Invalid credentials"});
            }

            //Generate JWT token
            const token=jwt.sign({id:user.id,email:user.email,role:user.role},
                process.env.JWT_SECRET,{expiresIn:"2h"});

            res.status(200).json({message:"Login successful",token});
    }catch(error){
        res.status(500).json({error:"Server error"});
    }
};