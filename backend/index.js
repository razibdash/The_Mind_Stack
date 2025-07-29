require("dotenv").config();
const express = require("express");
const cors= require("cors");
const connectDB = require("./config/db/DB");
const bodyParser = require("body-parser");
const app = express();
//Port
const PORT = process.env.PORT || 5000;

cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],

})
//Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Database Connection
connectDB();

//app listening
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});