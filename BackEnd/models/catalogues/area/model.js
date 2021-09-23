var mongoose = require('mongoose');
const Schema = mongoose.Schema;
//schema

const User = require('../../user/model');

var schema = mongoose.Schema({
    name:{type: String, required: [true, 'Campo obligatorio']},
    logo:{
        data: Buffer,
        contentType: String
    },
   // manager:{ type: Schema.Types.ObjectId, ref: 'User' },
    
});


// Export Element Model
var Element = module.exports = mongoose.model('Area', schema);
module.exports.get = function (callback, limit) {
    Element.find(callback).limit(limit); 
}