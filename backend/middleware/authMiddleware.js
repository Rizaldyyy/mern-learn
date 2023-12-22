const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/UsersModel');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try {

      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      // Verify token
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      // Get user fron the token
      req.user = await User.findOne({ sessionid: decode.sessionid }).select('-password');

      if(!req.user){
        throw new Error('Not authorized');
      }

      next()

    } catch (error) {
      res.status(401);
      throw new Error('Not authorized');
    }
  }

  if(!token){
    res.status(401);
    throw new Error('Not authorized, no token');
  }

});

module.exports = { protect }
