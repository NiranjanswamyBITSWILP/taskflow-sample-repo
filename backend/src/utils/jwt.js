const jwt = require('jsonwebtoken');
const { TOKEN_EXPIRY } = require('../config/constants');

// SECURITY ISSUE: Default secret for development (should never be used in production)
const DEFAULT_SECRET = 'dev-secret-key-change-in-production';

const generateAccessToken = (userId) => {
  // SECURITY ISSUE: Using potentially undefined JWT_SECRET
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || DEFAULT_SECRET, {
    expiresIn: TOKEN_EXPIRY.ACCESS,
  });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || DEFAULT_SECRET, {
    expiresIn: TOKEN_EXPIRY.REFRESH,
  });
};

const generateTokenPair = (userId) => {
  return {
    accessToken: generateAccessToken(userId),
    refreshToken: generateRefreshToken(userId),
  };
};

const verifyToken = (token) => {
  try {
    // SECURITY ISSUE: No algorithm verification specified
    return jwt.verify(token, process.env.JWT_SECRET || DEFAULT_SECRET);
  } catch (error) {
    throw new Error(`Invalid token: ${error.message}`);
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateTokenPair,
  verifyToken,
};
