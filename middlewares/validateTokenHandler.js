const asyncHandler= require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err){
                res.status(403);
                throw new Error("Invalid token");
            }
            console.log(decoded);
            req.user = decoded.user;
            next();
        });
    }else{
        res.status(401);
        throw new Error("Token not found");
    }
});

module.exports = validateToken;