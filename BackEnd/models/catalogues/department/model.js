var mongoose = require('mongoose');
const Schema = mongoose.Schema;
//schema
var schema = mongoose.Schema({
    name:{type: String, required: [true, 'Campo obligatorio']},
    code:{type: String},
    logo:
    {
        data: Buffer,
        contentType: String
    },
    stamp:
    {
        data: Buffer,
        contentType: String
    },
   /* manager:
    {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    areas:[{ type: Schema.Types.ObjectId, ref: 'Area'}]*/
});
//const Area = require('../area/model');
const User = require('../../user/model');

var collection = 'departments'

// Export Element Model
var Department = module.exports = mongoose.model('Department', schema,collection);
module.exports.get = function (callback, limit) {
    Department.find(callback).limit(limit); 
}