var mongoose = require('mongoose');
const Schema = mongoose.Schema;
//schema
const User = require('../user/model');
const Event = require('../event/model');
var schema = mongoose.Schema({
    date:{type: Date, required: [true, 'Campo obligatorio']},
    events:[{ type: Schema.Types.ObjectId, ref: Event , required: [true, 'Campo obligatorio']}],
    assistent:{ type: Schema.Types.ObjectId, ref: User, required: [true, 'Campo obligatorio']},
    expedite:{ type: Schema.Types.ObjectId, ref: User },  
    type:{type: String, required: [true, 'Campo obligatorio']},
    invoice:{type:String}
});



var collection = 'documents'

// Export Element Model
var Element = module.exports = mongoose.model('Constancy', schema,collection);
module.exports.get = function (callback, limit) {
    Element.find(callback).limit(limit); 
}