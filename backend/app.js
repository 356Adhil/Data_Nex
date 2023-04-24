const express = require("express");
const routes = require("../backend/routes/route");
const cors = require("cors");
const path = require("path");
const connectDB = require("../backend/config/db");
require('dotenv').config();

const app = express();
app.use(cors()); 

// Serve the images in the 'uploads' folder as static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connection to DB
connectDB();

// Set up routes
app.use(routes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});