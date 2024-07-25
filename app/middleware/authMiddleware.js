const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const authMiddleware = async (req, res, next) => {
  try {
    // Get the token from the request headers
    const token = req.headers.authorization.spli
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by ID
    const user = await User.findById(decoded.userId);

    // If the user is not found, return an error
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Attach the user to the request object
    req.user = user;

    // Call the next middleware
    next();
  } catch (error) {
    // If there's an error, return an error response
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
