const router = require("express").Router();
const { storage } = require("../config/storageConfig");
const multer = require("multer");
const imageController = require("../controllers/imgController");

// Set up multer middleware to handle image uploads
const upload = multer({ storage });

// Image uploading route
router.post("/upload", upload.single("image"), imageController.uploadImage);

// Sending image to front-end route
router.get("/images", imageController.getImages);

module.exports = router;

