import User from "../models/userModel.js";

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



export {createUser}