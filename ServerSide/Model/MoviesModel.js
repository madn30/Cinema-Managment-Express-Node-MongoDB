const mongoose = require('mongoose');
const moment = require('moment')

let MoviesSchema = new mongoose.Schema({
    Name : String,
    Genres : [String],
    Image : String,
    Premiered: Date
  
});

module.exports = mongoose.model('movies',MoviesSchema);
