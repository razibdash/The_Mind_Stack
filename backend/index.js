const dotenv=require('dotenv')
const express = require("express");
const cors= require("cors");
const connectDB = require("./config/db/DB.js");
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary").v2;
const app = express();

dotenv.config()
//Routes
const authRoutes = require("./routes/auth-routes/index.js");
const aiRoutes = require("./routes/Ai/ai-routes.js");
const mediaRoutes = require("./routes/instructor-routes/media-routes.js");
//Port
const PORT = process.env.PORT || 5000;
//CORS configuration
cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],

})
// --- Cloudinary Config ---
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Database Connection
connectDB();


// API routes
app.use("/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/media", mediaRoutes);

//app listening
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});