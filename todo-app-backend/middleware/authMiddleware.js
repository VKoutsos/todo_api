const jwt=require('jsonwebtoken');
require('dotenv').config();

//admin authentication
exports.authenticateAdmin=(req,res,next)=>{
    //ensure the user is authenticated first
    if(!req.user){
        return res.status(401).json({error:"Unauthorized: No user data found"});
    }
    if (req.user.role !=="admin"){
        return res.status(403).json({error:"Forbidden:Admins only"})
    }
    next();
};

exports.authenticateUser=(req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({error: "Unauthorized: No token provided"});
    }

    const token = authHeader.split(" ")[1];//Extract token after 'Bearer'

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({error: "Invalid token"});
        }
        req.user = decoded;
        next();
    });
};