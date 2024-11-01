const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  issue: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'open',
    enum: ['open', 'in-progress', 'closed'],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Ticket', ticketSchema);
