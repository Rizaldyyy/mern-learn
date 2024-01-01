const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const User = require('../models/UsersModel');

// @desc Register a User
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  let sessionid = '';

  const userExists = await User.findOne({ email });
  if(userExists){
    res.status(400);
    throw new Error('User already exists.');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, password: hashedPassword, sessionid });
  if(user){
    session = generateSession(20);
    const updateSession = await User.findByIdAndUpdate(user._id, {sessionid: session});

    res.status(201).json({
      message: "User created!",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(session)
      }
    });
  } else {
    res.status(400);
    throw new Error('Invalid User Data.');
  }
});

// @desc Authenticate a User
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({email});
  if (user && (await bcrypt.compare(password, user.password))){

    const session = generateSession(20);
    const updateSession = await User.findByIdAndUpdate(user._id, {sessionid: session});

    res.status(200).json({
      message: "User login!",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(session)
      }
    });
  } else {
    res.status(400);
    throw new Error('Invalid User Credentials.');
  }


  res.status(200).json({ message: 'Auth Users' });
});

// @desc Get user data
// @route GET /api/users/me
// @access Private
const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// Generate JWT
const generateToken = (sessionid) => {
  return jwt.sign({ sessionid }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

// Generate session id
const generateSession = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser
}
