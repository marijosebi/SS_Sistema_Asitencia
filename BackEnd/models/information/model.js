var mongoose = require('mongoose');
//schema
const Schema = mongoose.Schema;
var schema = mongoose.Schema({
    _id: false,
    name:{
        name:{type: String, required: [true, 'Campo obligatorio']},
        firstname:{type: String, required: [true, 'Campo obligatorio']},
        secondname:{type: String}
    },
    birthdate:{type: Date,required: [true, 'Campo obligatorio']},
    gender:{type: String, required: [true, 'Campo obligatorio']},
    sex:{type: String, required: [true, 'Campo obligatorio']},
    //-----------------------------------------------
    providence:{type: String},
    //-----------------------------------------------
    type:{type: String},
    sign:{type: String},
    //-----------------------------------------------
    program:{ type: Schema.Types.ObjectId, ref: 'Program' },
    unit:{ type: Schema.Types.ObjectId, ref: 'Unit' },
});

const Program = require('../catalogues/program/model');
const Unit = require('../catalogues/unit/model');
// Export Info Model
module.exports =  schema
module.exports.get = function (callback, limit) {
    Info.find(callback).limit(limit); 
}