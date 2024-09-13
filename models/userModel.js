const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: [true, "Username already exists"],
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: [true, "Email already exists"],
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        trim: true,
    },
}, { timestamps: true });

module.exports= mongoose.model("User",userSchema);