const db=require("../config/db")

exports.getUserLogs=(req,res)=>{
    const userId=req.user.id;

    db.query("SELECT id, action, timestamp FROM logs WHERE user_id=? ORDER BY timestamp DESC",
        [userId],
        (err,results)=>{
        if (err) return res.status(500).json({error:err.message});
        res.status(200).json(results);
        });
};