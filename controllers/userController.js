const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//@desc register a new user
//@route POST /api/users/register
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    const userAvailable = await User.findOne({ email });
    if(userAvailable){
        res.status(400);
        throw new Error("User already exists");
    }
    const hashedPassword= await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
    if(user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
        });
    }else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});
//@desc login user
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    const user = await User.findOne({ email });
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
            }
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "30d",
        });
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            accessToken,
        });
    }else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

//@desc get current user
//@route GET /api/users/current
//@access Private
const currUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = {registerUser, loginUser, currUser};