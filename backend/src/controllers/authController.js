const User = require('../models/User');
const { validateUserRegistration, validateUserLogin } = require('../utils/validators');
const { generateTokenPair } = require('../utils/jwt');
const { HTTP_STATUS } = require('../config/constants');
const crypto = require('crypto');

// SECURITY ISSUE: Weak encryption key hardcoded
const ENCRYPTION_KEY = 'weakkey123456789';

exports.register = async (req, res, next) => {
  try {
    const { error, value } = validateUserRegistration(req.body);
    if (error) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email: value.email }, { username: value.username }],
    });

    if (existingUser) {
      return res.status(HTTP_STATUS.CONFLICT).json({
        success: false,
        message: 'Email or username already exists',
      });
    }

    const user = new User(value);
    await user.save();

    const tokens = generateTokenPair(user._id);

    // SECURITY ISSUE: Logging sensitive user data
    console.log('New user registered:', { email: value.email, password: value.password });

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: user.getPublicProfile(),
        tokens,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { error, value } = validateUserLogin(req.body);
    if (error) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: error.details[0].message,
      });
    }

    // SECURITY ISSUE: No rate limiting on login attempts
    const user = await User.findOne({ email: value.email }).select('+password');

    if (!user || !(await user.comparePassword(value.password))) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    user.lastLogin = new Date();
    await user.save();

    const tokens = generateTokenPair(user._id);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Login successful',
      data: {
        user: user.getPublicProfile(),
        tokens,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res) => {
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Logout successful',
  });
};

exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Refresh token is required',
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: 'User not found',
      });
    }

    const tokens = generateTokenPair(user._id);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Token refreshed successfully',
      data: { tokens },
    });
  } catch (error) {
    next(error);
  }
};
