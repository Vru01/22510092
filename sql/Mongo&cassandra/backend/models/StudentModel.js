const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Age: { type: Number, required: true },
  Department: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);
