const Image = require("../models/Image");

// controller for uploading images

const uploadImage = async (req, res) => {
  try {
    const { filename } = req.file;
    const image = await Image.create({ filename });
    res.json({ imageUrl: `/uploads/${filename}` });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Error uploading image" });
  }
};

// controller for sending images to front-end

const getImages = async (req, res) => {
  try {
    const images = await Image.find({});
    const imageUrls = images.reverse().map((image) => `/uploads/${image.filename}`);
    res.json(imageUrls);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Error fetching images" });
  }
};

module.exports = { uploadImage, getImages };
