const mongoose = require('mongoose');

let urlSchema = mongoose.Schema({
  original: String,
  short: String
});

module.exports = mongoose.model('URL', urlSchema);
