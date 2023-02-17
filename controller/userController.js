import User from "../models/userModel.js";
import bcrypt from "bcrypt"

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
const loginUser= async (req,res)=>{
  try{

      const { username,password}=req.body;
      console.log("Req.Body",req.body)
      const user=await User.findOne({username})
      let same=false
      if(user){
        

          same=await bcrypt.compare(password,user.password)
          console.log("sam",same)
          
      }
      else{
        return res.status(400).redirect("/login")
      }
      if(same){
        res.status(200).send("success")
      }
      else{
        res.status(400).redirect("/login")
      }



  }catch (error) {
    res.status(400).json({
      success: false,
      error,
      
    });
  }

}



export {createUser,loginUser}