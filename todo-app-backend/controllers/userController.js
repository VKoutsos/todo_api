
const {queryDatabase}=require("../utils/dbHelpers");

exports.getUserLogs=async(req,res)=>{
    try{
        const userId=req.user.id;

        //fetch logs

        const logs=await queryDatabase("SELECT id, action, timestamp FROM logs WHERE user_id=? ORDER BY timestamp DESC", [userId]);

        //fetch created_at
        const userResult=await queryDatabase("SELECT created_at FROM users WHERE id=?", [userId]);

        res.status(200).json({
            created_at:userResult[0]?.created_at,
            logs
        });
    }catch(err){
        res.status(500).json({error:err.message});
    }
};