const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const userModel = require('../models/userModel');

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    // Check if user exists
    const userExists = await userModel.findOne('email', email);

    console.log(userExists);
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await userModel.create(name, email, hashedPassword);
    // console.log(user.insertId);

    if (user) {
        res.status(201).json({
            ID: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    }

    res.json({ message: 'register user' })
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body;

    const user = await userModel.findOne('email', email, true);

    if (user && (await bcrypt.compare(password, user.password))) {
        console.log(user);
        res.json({
            ID: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    } else {
        console.log('didn\'t find user')
        res.status(400);
        throw new Error('Invalid credentials');
    }

    // res.json({ message: 'Login user' })
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
};