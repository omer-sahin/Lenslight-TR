import Photo from "../models/PhotoModel.js";

const createPhoto = async (req, res) => {
  try {
    const photo = await Photo.create(req.body);

    res.status(201).json({
      cussess: true,
      photo,
    });
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
    const photo = await Photo.findById({_id:req.params.id});

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
