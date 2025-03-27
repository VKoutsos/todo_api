const db=require("../config/db");

const logAction=(userId, action)=>{
    db.query(
        "INSERT INTO logs (user_id, action) VALUES (?,?)",
        [userId,action],
        (err)=>{
            if (err) console.error("Logging Error:",err);
        }
    );
};

module.exports=logAction;       