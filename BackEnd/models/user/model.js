var mongoose = require('mongoose');
var info= require('../information/model');
//schema
var schema = mongoose.Schema({
    user:{type: String, required: [true, 'Campo obligatorio']},
    password:{type: String, required: [true, 'Campo obligatorio']},
    type:{type: String, required: [true, 'Campo obligatorio']},
    state: {type: Boolean, default: true},
    information:info
});
var collection = 'users'

// Export User Model
var User = module.exports = mongoose.model('User', schema,collection);
module.exports.get = function (callback, limit) {
   User.find(callback).limit(limit); 
}