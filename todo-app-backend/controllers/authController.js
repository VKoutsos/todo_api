const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db=require("../config/db");
const notify=require("../utils/notify");
require('dotenv').config();

//register a new user
exports.registerUser=async(req,res)=>{
    const{name,email,password}=req.body;

    if(!name||!email||!password){
        return res.status(400).json({error:"All fields are required"});
    }

    try{
        //check if user already exists
        db.query("SELECT * FROM users WHERE email=?",[email],async(err,results)=>{
            if(err) return res.status(500).json({error:err.message});

            if (results.length>0){
                return res.status(400).json({error:"User already exists"});
            }

            //Hash password
            const hashedPassword=await bcrypt.hash(password,10);

            //Insert new user
            db.query(
                "INSERT INTO users (username,email,password) VALUES (?,?,?)",
                [name,email,hashedPassword],
                (err,result)=>{
                    if (err) return res.status(500).json({error: err.message});

                    notify(email,"New User Registered",`Hi ${name}! Welcome to my To-Do List Application!`);

                    res.status(201).json({message:"User registered successfully"});
                }
            );
        });
    }catch(error){
        res.status(500).json({error:"Server error"});
    }
};

//User login
exports.loginUser=(req,res)=>{
    const {email,password}=req.body;

    if(!email||!password){
        return res.status(400).json({error:"Email and password are required"});
    }

    try{
        db.query("SELECT * FROM users WHERE email=?",[email],async(err,results)=>{
            if (err) return res.status(500).json({error:err.message});

            if (results.length===0){
                return res.status(400).json({error:"Invalid credentials"});
            }

            const user=results[0];

            //Compare password
            const isMatch=await bcrypt.compare(password,user.password);
            if(!isMatch){
                return res.status(400).json({error:"Invalid credentials"});
            }

            //Generate JWT token
            const token=jwt.sign({id:user.id,email:user.email,role:user.role},process.env.JWT_SECRET,{expiresIn:"1h"});

            res.status(200).json({message:"Login successful",token});
        });
    }catch(error){
        res.status(500).json({error:"Server error"});
    }
};