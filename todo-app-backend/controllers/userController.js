const db=require("../config/db");
const {queryDatabase}=require("../utils/dbHelpers");

exports.getUserLogs=async(req,res)=>{
    try{
        const userId=req.user.id;

        const logs=await queryDatabase("SELECT id, action, timestamp FROM logs WHERE user_id=? ORDER BY timestamp DESC", [userId]);

        res.status(200).json(logs)
    }catch(err){
        res.status(500).json({error:err.message});
    }
};