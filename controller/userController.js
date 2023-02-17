import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      cussess: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });
    let same = false;
    if (user) {
      same = await bcrypt.compare(password, user.password);
      
    } else {
      return res.status(400).redirect("/login");
    }
    if (same) {
      res.status(200).json({
        user,
        token:createtoken(user. _id),

      })
    } else {
      res.status(400).redirect("/login");
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};


const createtoken=(userId) =>{
  return jwt.sign({userId},process.env.JWT_SECRET,{
    expiresIn:"1d",
  })
}

export { createUser, loginUser };
