var mongoose = require('mongoose');
const Schema = mongoose.Schema;
//schema
var schema = mongoose.Schema({
    name:{type: String, required: [true, 'Campo obligatorio']},
    code:{type: String, required: [true, 'Campo obligatorio']},
    departments:[{
        department: { type: Schema.Types.ObjectId, ref: 'Department'},
        manager:{type: String},
        areas:[{
            area: { type: Schema.Types.ObjectId, ref: 'Area'},
            manager:{type: String}
        }
        ],
    }
    ],
    programs:[{ type: Schema.Types.ObjectId, ref: 'Program'}],
    logo:{
        data: Buffer,
        contentType: String
    },
});
const Program = require('../program/model');
const Department = require('../department/model');
const Area = require('../area/model');

var collection = 'units'

// Export Element Model
var Element = module.exports = mongoose.model('Unit', schema,collection);
module.exports.get = function (callback, limit) {
    Element.find(callback).limit(limit); 
}