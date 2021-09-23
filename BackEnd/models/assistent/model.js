var mongoose = require('mongoose');
var info= require('../information/model');
const Schema = mongoose.Schema;
//schema

var schema = mongoose.Schema({message:String},
     {discriminatorKey: 'type' });

var Element = module.exports = mongoose.model('Information', schema);

const InternalEvent = Element.discriminator('Internal', new Schema({
    _id: false,
        assistent:{ type: Schema.Types.ObjectId, ref: 'User' ,require: [true, 'Campo obligatorio'] },
}));
    
const User = require('../user/model');

const ExternalEvent = Element.discriminator('External', new Schema({
    _id: false,
    assistent: info
}));

// Export Element Model

module.exports.get = function (callback, limit) {
    Element.find(callback).limit(limit); 
}