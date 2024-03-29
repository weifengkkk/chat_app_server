const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    },
    password:{
        type: String,
        required: true,
        min: 8,
        max: 20,
        unique: false
    },
    isAvatarImageSet:{
        type: Boolean,
        default: false,
    },
    avatarImage:{
        type: String,
        default: "",
    }
})

module.exports = mongoose.model("User",userSchema)