import Photo from "../models/PhotoModel.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const createPhoto = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "Lenslight_TR",
    }
  );

  try {
    await Photo.create({
      name: req.body.name,
      description: req.body.description,
      user: res.locals.user._id,
      url: result.secure_url,
      image_id:result.public_id
    });

    fs.unlinkSync(req.files.image.tempFilePath);

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
    const photos = res.locals.user
      ? await Photo.find({ user: { $ne: res.locals.user._id } })
      : await Photo.find({});

    res.status(200).render("gallery", {
      photos,
      pages: "photo",
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
    const photo = await Photo.findById({ _id: req.params.id }).populate("user");
   let isOwner=false;

   if(res.locals.user){
    isOwner=photo.user.equals(res.locals.user._id)
   
   
   }
    

    
   
    res.status(200).render("photo", {
      photo,
      pages: "photoone",
      isOwner
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};


const deletePhoto= async (req,res)=>{
  try{ 

    const photo=await Photo.findById(req.params.id)
    const photoId=photo.image_id;
    await cloudinary.uploader.destroy(photoId)
    await Photo.findOneAndDelete({_id:req.params.id})
    res.status(200).redirect("/users/dashboard")

     

  }
  catch(error){
    res.status(400).json({
      success: false,
      error,
    });

  }



}



const updatePhoto =async (req,res)=>{
  try{
    const photo= await Photo.findById(req.params.id);

    if (req.files){
      const photoId=photo.image_id;
      await cloudinary.uploader.destroy(photoId)

      const result =await cloudinary.uploader.upload(req.files.image.tempFilePath,{
        use_filename:true,
        folder:"Lenslight_TR"
      })


      photo.url=result.secure_url;
      photo.image_id=result.public_id
      fs.unlinkSync(req.files.image.tempFilePath)

    }
    photo.name=req.body.name;
    photo.description=req.body.description
    photo.save();

    res.status(200).redirect(`/photos/${req.params.id}`)

  }
  catch  (error){
    res.status(400).json({
      succcess:false,
      error
    })
  }

}

export { createPhoto, getAllPhotos, getPhotos,deletePhoto ,updatePhoto};
