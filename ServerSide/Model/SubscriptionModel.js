const mongoose = require('mongoose');

let subscriptionSchema = new mongoose.Schema({
    MemberId : String,
    Movies : [{movieId:String,Time:Date}]
   
});

module.exports = mongoose.model('subscriptions',subscriptionSchema);
