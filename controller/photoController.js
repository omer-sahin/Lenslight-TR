import Photo from "../models/PhotoModel.js";
import {v2 as cloudinary } from "cloudinary"
import fs from "fs"

const createPhoto = async (req, res) => {


  const result=await cloudinary.uploader.upload(
    req.files.image.tempFilePath,{
      use_filename:true,
      folder:"Lenslight_TR"

    }
  )
 
  try {
     await Photo.create({
      name:req.body.name,
      description:req.body.description,
      user:res.locals.user._id,
      url:result.secure_url

    });

    fs.unlinkSync(req.files.image.tempFilePath)

    res.status(201).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
      
    });
  }
};

const getAllPhotos = async (req, res) => {
  try {
    const photos = await Photo.find({});

    res.status(200).render("gallery", {
      photos,
      pages:"photo"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

const getPhotos = async (req, res) => {
  try {
    const photo = await Photo.findById({_id:req.params.id}).populate("user")

    res.status(200).render("photo", {
      photo,
      pages:"photoone"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

export { createPhoto, getAllPhotos ,getPhotos};
