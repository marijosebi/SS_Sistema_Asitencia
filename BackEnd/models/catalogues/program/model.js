var mongoose = require('mongoose');
//schema
var schema = mongoose.Schema({
    name:{type: String, required: [true, 'Campo obligatorio']},
    code:{type: String},
    
    
});
var collection ='programs'

// Export Element Model
var Element = module.exports = mongoose.model('Program', schema,collection);
module.exports.get = function (callback, limit) {
    Element.find(callback).limit(limit); 
}