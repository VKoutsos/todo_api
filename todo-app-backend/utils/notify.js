const sendMail=require("./mailer");
require("dotenv").config();

const ADMIN_EMAIL=process.env.EMAIL_USER;

module.exports=function notify(userEmail,subject,message){
    //send to user (if denied)
    if (userEmail){
        console.log("Sending to user:",userEmail);
        sendMail(userEmail,subject,message);
    }

    if (ADMIN_EMAIL && userEmail!==ADMIN_EMAIL){
        console.log("Sending to admin:",ADMIN_EMAIL);
        sendMail(ADMIN_EMAIL,subject,message);
    }
};