
const mongoose = require('mongoose');
const DB_URI = process.env.MONGO_URI;

const dbConnect = () => mongoose.connect(DB_URI)
.then(() => console.log("✅ Mongoose connected to MongoDB Atlas"))
.catch(err => console.log("❌ Mongoose connection error:", err));

module.exports = dbConnect;