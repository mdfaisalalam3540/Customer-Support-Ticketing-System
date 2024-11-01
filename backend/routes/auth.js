const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const user = new User({ username, email, password, role });
        await user.save();
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(400).json({ msg: 'Error registering user' });
    }
});

// User Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.json({ token });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ msg: 'Error logging in' });
    }
});

module.exports = router;
