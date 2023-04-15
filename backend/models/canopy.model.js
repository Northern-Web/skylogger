const mongoose  = require('mongoose');
const timestamp = require('mongoose-timestamp');

var CanopySchema = new mongoose.Schema({
  model: {
    type: String,
    required: true,
    trim: true
  },
  manufacturer: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  isActive {
    type: Boolean,
    required: true,
    default: true
  }

});

CanopySchema.plugin(timestamp);

var Canopy = mongoose.model('Canopy', CanopySchema);
module.exports = { Canopy };