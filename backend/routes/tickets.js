const express = require("express");
const auth = require("../middleware/authMiddleware");
const Ticket = require("../models/Ticket");
const router = express.Router();

// Inside routes/tickets.js
router.get('/', auth, async (req, res) => {
    try {
        const tickets = await Ticket.find({ user: req.user._id });
        res.json(tickets);
    } catch (error) {
        console.error("Error fetching tickets:", error);
        res.status(500).json({ msg: 'Error fetching tickets' });
    }
});


// User can create a ticket
router.post('/', auth, async (req, res) => {
    const { issue } = req.body;

    console.log("Received ticket creation request:", req.body);
    console.log("User from auth middleware:", req.user); // Log the user object

    try {
        if (!issue) {
            return res.status(400).json({ msg: 'Issue is required' });
        }

        // Create a new ticket with userId set to req.user._id
        const ticket = new Ticket({
            userId: req.user._id, // Ensure this references the correct property
            issue
        });

        await ticket.save();
        res.status(201).json(ticket);
    } catch (error) {
        console.error("Error creating ticket:", error); // Log error details
        res.status(400).json({ msg: 'Error creating ticket', error: error.message });
    }
});




// Admin can update a ticket
router.put('/:id', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access Denied' });

    try {
        const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(ticket);
    } catch (error) {
        res.status(400).json({ msg: 'Error updating ticket' });
    }
});

module.exports = router;
