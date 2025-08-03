const moongose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = new moongose.Schema({
    userName:String,
    userEmail:String,
    password:String,
    role:String,
})

module.exports = moongose.model('User', UserSchema)
