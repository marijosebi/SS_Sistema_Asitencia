var mongoose = require('mongoose');
//schema
var periodSchema = mongoose.Schema({
    id:{type: String, required: [true, 'Campo obligatorio']},
    date:[{type: Date,required: [true, 'Campo obligatorio']}],
});
var collection = 'periods'

// Export User Model
var Period = module.exports = mongoose.model('Period', periodSchema,collection);
module.exports.get = function (callback, limit) {
   Period.find(callback).limit(limit); 
}