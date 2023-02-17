
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
const authenticateToken = async (req, res, next) => {
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];



    if(!token){
        return res.status(401).json({
            succeeded:true,
            error:"No token available"
        })

    }
    req.user=await  User.findById(jwt.verify(token,process.env.JWT_SECRET).userId)

    next();
};

export { authenticateToken };
