import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({user:user._id})
  } catch (error) {
    let errors2 = {};
    if(error.code===11000){
      errors2.email="Bu mail kullanıldı";

    }

    if(error.name==="ValidationError"){
      Object.keys(error.errors).forEach((key)=>{
        errors2[key]=error.errors[key].message

      })
    }
   
   

    res.status(400).json(errors2);
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
      const token = createtoken(user._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      });
      res.status(200).redirect("/users/dashboard");
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

const createtoken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const getDashboardPage = (req, res) => {
  res.status(200).render("dashboard", {
    pages: "dashboard",
  });
};

export { createUser, loginUser, getDashboardPage };
