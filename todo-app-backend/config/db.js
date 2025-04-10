const mysql=require('mysql2');
require('dotenv').config({path: '../.env'});
const util=require('util');

const db=mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
});

//promisify query method for async/await
db.query=util.promisify(db.query).bind(db);

db.connect((err)=>{
    if (err){
        console.error("Database connection failed:", err);
    }
    console.log("Connected to MySQL database")
});

module.exports=db;