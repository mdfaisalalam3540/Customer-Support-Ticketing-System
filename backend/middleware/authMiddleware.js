const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Make sure this path is correct

const auth = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract the token from the header
    if (!token) {
        return res.status(401).json({ msg: 'Access denied, no token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        req.user = await User.findById(decoded.id); // Attach the user to the request object
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(400).json({ msg: 'Invalid token' });
    }
};

module.exports = auth;

